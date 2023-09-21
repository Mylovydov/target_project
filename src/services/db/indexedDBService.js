import useDiscoverOptionsTable from './hooks/useDiscoverOptionsTable';
import { useCallback } from 'react';
import useNotification from '../../hooks/useNotification';
import useDexieDB from './hooks/useDexieDB';
import { setMinMaxAxiosValueToStorage } from '../../config/chart/bubbles/helpers';
import useUsersTable from './hooks/useUsersTable';
import useMetaKeysTable from './hooks/useMetaKeysTable';
import useMetaValuesTable from './hooks/useMetaValuesTable';
import {
	DBName,
	defaultUploadDataFields,
	metaValuesObjectStoreFields,
	usersObjectStoreFields
} from '../../config/dexie';
import getDbUser from './utils/getDbUser';
import { getChartData, getTableRowData } from './utils';
import getMetaFields from './utils/getMetaFields';
import getMetaKeysValuesRange from './utils/getMinMaxRange';
import {
	barChartItemsLimit,
	boolAttributesName,
	categoricalAttributesName,
	localStorageAxiosKey,
	localStorageDefineTargetAudienceAttrKey,
	localStorageDefineTargetAudienceFilter,
	localStorageNavigationsKey,
	localStorageSearchTermSetKey,
	rangeAttributesName
} from '../../constants';
import prepareBarChartData from './utils/prepareBarChartData';
import { calculateRevealBarChartData } from './utils/calculateRespondentsFieldCount';
import calculatePercentageOf from './utils/calculatePercentageOf';
import Dexie from 'dexie';
import { removeItemsByKeyFromLocalStorage } from '../localStorage/localStorageService';
import useLocalStorage from '../../hooks/useLocalStorage';
import filterRespondentsByNeedIdAndInfoNeed from './utils/filterRespondentsByNeedIdAndInfoNeed';

const useIndexedDBService = () => {
	const dexieDB = useDexieDB();
	const usersTable = useUsersTable();
	const metaKeysTable = useMetaKeysTable();
	const metaValuesTable = useMetaValuesTable();
	const discoverOptionsTable = useDiscoverOptionsTable();

	const [audienceFilter] = useLocalStorage(localStorageDefineTargetAudienceFilter, null);

	const { open } = useNotification();

	const checkDataBaseExist = useCallback(async () => {
		return await Dexie.exists(DBName);
	}, []);

	const clearData = useCallback(async () => {
		await usersTable.clear();
		await metaKeysTable.clear();
		await metaValuesTable.clear();
		await discoverOptionsTable.clear();

		removeItemsByKeyFromLocalStorage([
			localStorageDefineTargetAudienceFilter,
			localStorageDefineTargetAudienceAttrKey,
			localStorageAxiosKey,
			localStorageSearchTermSetKey,
			localStorageNavigationsKey
		]);
	}, [usersTable, metaKeysTable, metaValuesTable, discoverOptionsTable]);

	const addMetaKeysToDB = useCallback(
		(metaKeys) => {
			return dexieDB.transaction('rw', metaKeysTable, async () => {
				await metaKeysTable.bulkAdd(metaKeys);
			});
		},
		[dexieDB, metaKeysTable]
	);

	const addDiscoverOptionsToDB = useCallback(
		(options) => {
			return dexieDB.transaction('rw', discoverOptionsTable, async () => {
				await discoverOptionsTable.bulkAdd(options);
			});
		},
		[dexieDB, discoverOptionsTable]
	);

	const addMetaValuesToDB = useCallback(
		(users, fieldsInfo) => {
			return dexieDB.transaction('rw', metaValuesTable, metaKeysTable, async () => {
				const metaValuesToCreate = [];
				const metaKeysIdHash = {};

				for (let i = 0; i < users.length; i++) {
					const { userId, metaFields } = users[i];
					const metaFieldsEntries = Object.entries(metaFields);

					for (let j = 0; j < metaFieldsEntries.length; j++) {
						const [fieldName, fieldValue] = metaFieldsEntries[j];
						const fieldInfo = fieldsInfo[fieldName];

						if (metaKeysIdHash[fieldName]) {
							metaValuesToCreate.push({ metaKeyId: metaKeysIdHash[fieldName], userId, value: fieldValue });
							continue;
						}

						const metaKeyObj = await metaKeysTable.get(fieldInfo);
						metaKeysIdHash[fieldName] = metaKeyObj.id;

						metaValuesToCreate.push({ metaKeyId: metaKeyObj.id, userId, value: fieldValue });
					}
				}

				metaValuesTable.bulkAdd(metaValuesToCreate);
			});
		},
		[dexieDB, metaValuesTable, metaKeysTable]
	);

	const setUploadDataToDb = useCallback(
		(respondents, fieldsInfo) => {
			setMinMaxAxiosValueToStorage(respondents);
			return dexieDB.transaction(
				'rw',
				[usersTable, metaKeysTable, metaValuesTable, discoverOptionsTable],
				async () => {
					addMetaKeysToDB(Object.values(getMetaFields(fieldsInfo)));
					const { needId, infoNeed } = defaultUploadDataFields;

					const usersToCreate = [];
					const optionsVocabulary = {};

					for (let i = 0; i < respondents.length; i++) {
						const respondent = respondents[i];
						const respondentInfoNeed = respondent[infoNeed];

						if (!(optionsVocabulary[respondentInfoNeed])) {
							optionsVocabulary[respondentInfoNeed] = {
								[infoNeed]: respondentInfoNeed,
								[needId]: respondent[needId]
							};
						}

						const newUser = getDbUser(respondent);
						usersToCreate.push(newUser);
					}

					await addDiscoverOptionsToDB(Object.values(optionsVocabulary));

					const createdUsersIds = await usersTable.bulkAdd(usersToCreate, { allKeys: true });
					const usersForMetaValues = respondents.map((respondent, i) => ({
						userId: createdUsersIds[i],
						metaFields: getMetaFields(respondent)
					}));

					addMetaValuesToDB(usersForMetaValues, fieldsInfo);
				}
			);
		},
		[dexieDB, usersTable, metaKeysTable, metaValuesTable, addMetaKeysToDB, addMetaValuesToDB, addDiscoverOptionsToDB, discoverOptionsTable]
	);

	const getStatistic = () => {
		return dexieDB.transaction(
			'r',
			[usersTable, metaKeysTable, metaValuesTable],
			async () => {

				const { userId, searchTerm, infoNeed } = usersObjectStoreFields;

				const numberOfObservations = await usersTable.count();
				const respondentAttrList = await metaKeysTable.toArray(attributes => attributes.map(attribute => attribute.label));
				const numberOfRespondents = await usersTable.orderBy(userId).uniqueKeys();
				const numberOfUniqueSearchTerm = await usersTable.orderBy(searchTerm).uniqueKeys();
				const numberOfUniqueInformationNeed = await usersTable.orderBy(infoNeed).uniqueKeys();

				return {
					numberOfObservations,
					numberOfRespondents: numberOfRespondents.length,
					numberOfUniqueSearchTerm: numberOfUniqueSearchTerm.length,
					numberOfInformationNeeds: numberOfUniqueInformationNeed.length,
					numberOfRespondentAttr: respondentAttrList.length,
					respondentAttrList
				};
			}
		)
			.catch((err) => open({ message: err.message, variant: 'error' }));
	};

	const getOptions = (orderBy = defaultUploadDataFields.needId) => {
		return dexieDB.transaction(
			'r',
			discoverOptionsTable,
			async () => {
				return discoverOptionsTable
					.orderBy(orderBy)
					.toArray();
			}
		)
			.catch(err => open({ message: err.message, variant: 'error' }));
	};

	const changeInfoNeed = useCallback(
		(infoNeedValue, infoNeedIdValue, value) => {
			return dexieDB.transaction(
				'rw',
				[usersTable, discoverOptionsTable],
				async () => {

					const { infoNeed, needId } = usersObjectStoreFields;

					const filter = {
						[infoNeed]: infoNeedValue,
						[needId]: infoNeedIdValue
					};

					const modifyData = {
						[infoNeed]: value
					};

					usersTable.where(filter).modify(modifyData);
					discoverOptionsTable.where(filter).modify(modifyData);
				}
			)
				.catch(err => open({ message: err.message, variant: 'error' }));
		},
		[dexieDB, usersTable, discoverOptionsTable, open]
	);

	const getExportData = useCallback(() => {
		return dexieDB.transaction(
			'r',
			[usersTable, metaKeysTable, metaValuesTable],
			async () => {
				const users = await usersTable.toArray();
				const metaKeys = await metaKeysTable.toArray(keys => keys.reduce((acc, key) => {
					return {
						...acc,
						[key.id]: key
					};
				}, {}));

				return await Promise.all(users.map(async ({ id, ...user }) => {
					const metaValues = await metaValuesTable.where({
						[metaValuesObjectStoreFields.userId]: id
					}).toArray();

					const userMetaData = metaValues.reduce((acc, { metaKeyId, value }) => {
						return {
							...acc,
							[metaKeys[metaKeyId].name]: value
						};
					}, {});

					return { ...user, ...userMetaData };
				}));
			}
		)
			.catch(err => open({ message: err.message, variant: 'error' }));
	}, [dexieDB, metaKeysTable, metaValuesTable, open, usersTable]);

	const getRespondentAttributes = async () => {
		return dexieDB.transaction(
			'r',
			[metaKeysTable, metaValuesTable],
			async () => {
				const metaKeys = await metaKeysTable.toArray();

				return await Promise.all(metaKeys.map(async ({ id, ...metaKey }) => {
					const currentMetaKeyValues = await metaValuesTable.where({
						[metaValuesObjectStoreFields.metaKeyId]: id
					}).toArray();

					if (metaKey.type === 'number') {
						const [min, max] = getMetaKeysValuesRange(currentMetaKeyValues);
						return { label: metaKey.label, name: metaKey.name, min, max, type: rangeAttributesName, value: [min, max] };
					}

					if (metaKey.type === 'boolean') {
						return { label: metaKey.label, name: metaKey.name, type: boolAttributesName, value: false };
					}


					// if isCategorical
					const categoricalItems = currentMetaKeyValues.reduce((acc, { value }) => {
						if (value === null || acc[value]) {
							return acc;
						}

						return {
							...acc,
							[value]: value
						};
					}, {});

					return {
						label: metaKey.label,
						name: metaKey.name,
						type: categoricalAttributesName,
						items: Object.keys(categoricalItems),
						value: []
					};
				}));
			}
		)
			.catch(err => open({ message: err.message, variant: 'error' }));
	};

	const getDiscoverData = useCallback((selectedOptions) => {
		return dexieDB.transaction('r', usersTable, async () => {
			const { needId, infoNeed, searchTerm, needProbability } = usersObjectStoreFields;

			const hasFilter = !!(selectedOptions[needId] && selectedOptions[infoNeed]);

			const legend = {
				[searchTerm]: 'searchTerm',
				[needProbability]: 'needProbability'
			};

			return usersTable.toArray(users => {
				if (hasFilter) {
					const filteredUsers = filterRespondentsByNeedIdAndInfoNeed(users, selectedOptions);
					return {
						tableRowsData: getTableRowData(filteredUsers.usersToRowsData, legend),
						chartData: getChartData(filteredUsers.usersToChartData)
					};
				}

				return {
					chartData: getChartData(users)
				};
			});
		})
			.catch(err => open({ message: err.message, variant: 'error' }));
	}, [dexieDB, open, usersTable]);

	const getRevealPageData = useCallback(() => {
			return dexieDB.transaction(
				'r',
				[metaKeysTable, metaValuesTable, usersTable],
				async () => {

					if (!audienceFilter) {
						return;
					}
					const respondents = await getExportData();

					const calculatedBarChartData = calculateRevealBarChartData(respondents, audienceFilter.filterItems || []);
					const lineChartData = Object
						.values(calculatedBarChartData)
						.reduce((acc, item) => acc + item.match, 0);

					const preparedBarChartData = prepareBarChartData(calculatedBarChartData);

					const limitedBarChartData = preparedBarChartData.length > barChartItemsLimit
						? preparedBarChartData.slice(0, barChartItemsLimit)
						: preparedBarChartData;

					return {
						chartItems: limitedBarChartData,
						lineChartData: calculatePercentageOf(lineChartData, respondents.length),
						labels: limitedBarChartData.map(item => item.label)
					};
				}
			)
				.catch(err => open({ message: err.message, variant: 'error' }));
		},
		[
			dexieDB,
			getExportData,
			metaKeysTable,
			metaValuesTable,
			open,
			usersTable,
			audienceFilter
		]
	);

	const getRelevantSearchTermByInfoNeed = (infoNeedId) => {
		return dexieDB.transaction('r', usersTable, async () => {
			if (!infoNeedId) {
				return;
			}

			const { searchTerm, needProbability } = defaultUploadDataFields;

			const legend = {
				[searchTerm]: 'searchTerm',
				[needProbability]: 'needProbability'
			};

			return usersTable
				.where({
					[usersObjectStoreFields.needId]: +infoNeedId
				})
				.toArray(users => getTableRowData(users, legend));
		})
			.catch(err => open({ message: err.message, variant: 'error' }));
	};

	const getSearchTermSet = (searchTermSet = []) => {
		return dexieDB.transaction('r', usersTable, async () => {
			const { infoNeed, searchTerm, needProbability } = defaultUploadDataFields;

			const legend = {
				[infoNeed]: 'infoNeed',
				[searchTerm]: 'searchTerm',
				[needProbability]: 'needProbability'
			};

			return usersTable
				.where(searchTerm)
				.anyOf(searchTermSet)
				.toArray(users => getTableRowData(users, legend));
		})
			.catch(err => open({ message: err.message, variant: 'error' }));
	};

	return {
		getStatistic,
		getOptions,
		changeInfoNeed,
		getExportData,
		getDiscoverData,
		setUploadDataToDb,
		getRespondentAttributes,
		getRevealPageData,
		getRelevantSearchTermByInfoNeed,
		getSearchTermSet,
		checkDataBaseExist,
		clearData
	};
};

export default useIndexedDBService;