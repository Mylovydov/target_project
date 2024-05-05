import React, { useCallback, useMemo, useState } from 'react';
import {
	DiscoverPageBodyStyled,
	DiscoverPageFooterStyled,
	DiscoverPageStyled
} from './discoverPage.styled';
import DiscoverCard from './components/discoverCard/DiscoverCard';
import Stack from '@mui/material/Stack';
import { useLiveQuery } from 'dexie-react-hooks';
import AppBackdrop from '../../components/appBackdrop/AppBackdrop';
import useNotification from '../../hooks/useNotification';
import useIndexedDBService from '../../services/db/indexedDBService';
import { exportJsonOrCSVFile } from '../../services/db/utils';
import { transformChartData } from './utils';
import {
	localStorageAxiosKey,
	localStorageModeKey,
	routes
} from '../../constants';
import { defaultUploadDataFields } from '../../config/dexie';
import { useNavigate } from 'react-router-dom';
import StepButton from '../../components/stepButton/StepButton';
import useLocalStorage from '../../hooks/useLocalStorage';

const defaultSelectedOptions = {
	[defaultUploadDataFields.infoNeed]: '',
	[defaultUploadDataFields.needId]: ''
};

const DiscoverPageContainer = () => {
	const { open } = useNotification();
	const navigate = useNavigate();
	const { getOptions, changeInfoNeed, getExportData, getDiscoverData } =
		useIndexedDBService();

	const [chartAxiosValues] = useLocalStorage(localStorageAxiosKey, null);
	const [isDemoMode] = useLocalStorage(localStorageModeKey, true);
	const [isOriginalBubblesSize, setIsOriginalBubblesSize] = useState(true);
	const [selectedOptions, setSelectedOptions] = useState(
		defaultSelectedOptions
	);

	const discoverOptions = useLiveQuery(getOptions);
	const filteredInfoNeedQueryResult = useLiveQuery(
		() => getDiscoverData(selectedOptions),
		[selectedOptions]
	);

	const onChangeFilter = useCallback(
		({ target }) => {
			const name = target.name;
			const value = target.value;

			const { needId } = defaultUploadDataFields;

			if (!value.toString()) {
				return setSelectedOptions(defaultSelectedOptions);
			}

			const selectedOption = discoverOptions.find(
				option => option[name] === value
			);
			setSelectedOptions(() => ({
				...selectedOption,
				[needId]: selectedOption[[needId]].toString()
			}));
		},
		[discoverOptions]
	);

	const onDownloadFile = useCallback(
		format => {
			getExportData()
				.then(dataToExport => exportJsonOrCSVFile(dataToExport, format))
				.catch(err => open({ message: err.message, variant: 'error' }));
		},
		[getExportData, open]
	);

	const onInfoNeedEdit = useCallback(
		value => {
			const { infoNeed, needId } = defaultUploadDataFields;

			changeInfoNeed(
				selectedOptions[infoNeed],
				+selectedOptions[needId],
				value
			).then(() => {
				setSelectedOptions(prevSelectedOptions => ({
					...prevSelectedOptions,
					[infoNeed]: value
				}));
				open({
					message: 'Information Need Labels is changed',
					variant: 'success'
				});
			});
		},
		[selectedOptions, changeInfoNeed, open]
	);

	const tableHeadings = useMemo(
		() => [
			{
				id: 'searchTerm',
				numeric: false,
				disablePadding: true,
				label: 'Search Terms'
			},
			{
				id: 'needProbability',
				numeric: true,
				disablePadding: true,
				label: 'Probability'
			}
		],
		[]
	);

	const onToggleOriginalBubblesSize = useCallback(() => {
		setIsOriginalBubblesSize(prev => !prev);
	}, []);

	const chartData = useMemo(
		() =>
			transformChartData(
				filteredInfoNeedQueryResult?.chartData,
				isOriginalBubblesSize,
				selectedOptions
			),
		[filteredInfoNeedQueryResult, isOriginalBubblesSize, selectedOptions]
	);

	const infoOptions = useMemo(() => {
		if (discoverOptions) {
			const { infoNeed, needId } = defaultUploadDataFields;
			return {
				infoNeedOptions: discoverOptions.map(item => item[infoNeed]),
				infoNeedIdOptions: discoverOptions.map(item => item[needId])
			};
		}
	}, [discoverOptions]);

	if (!(discoverOptions && chartData)) {
		return <AppBackdrop open={!(discoverOptions && chartData)} />;
	}

	return (
		<DiscoverPageStyled>
			<DiscoverPageBodyStyled>
				<DiscoverCard
					selectedInfoNeedId={selectedOptions[defaultUploadDataFields.needId]}
					selectedInfoNeed={selectedOptions[defaultUploadDataFields.infoNeed]}
					infoNeedOptions={infoOptions.infoNeedOptions}
					infoNeedIdOptions={infoOptions.infoNeedIdOptions}
					tableRows={filteredInfoNeedQueryResult?.tableRowsData}
					{...{
						tableHeadings,
						chartData,
						chartAxiosValues,
						onInfoNeedEdit,
						onDownloadFile,
						isDemoMode,
						onChangeFilter,
						onToggleOriginalBubblesSize,
						isOriginalBubblesSize
					}}
				/>
			</DiscoverPageBodyStyled>

			<DiscoverPageFooterStyled>
				<Stack direction="row" justifyContent="center" spacing={3}>
					<StepButton
						onClick={() => navigate(routes.statistic)}
						label="Previous step"
						color="warning"
					/>
					<StepButton
						onClick={() => navigate(routes.targetAudience)}
						label="Next step"
					/>
				</Stack>
			</DiscoverPageFooterStyled>
		</DiscoverPageStyled>
	);
};

export default DiscoverPageContainer;
