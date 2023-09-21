import React, { useCallback, useMemo, useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import useIndexedDBService from '../../services/db/indexedDBService';
import AppBackdrop from '../../components/appBackdrop/AppBackdrop';
import BuildSetPageStyled, { BuildSetPageBodyStyled, BuildSetPageHeadStyled } from './buildSetPage.styled';
import Typography from '@mui/material/Typography';
import BuildSetCard from './components/buildSetCard/BuildSetCard';
import {
	audienceDefinitionsStorageKey,
	boolAttributesName,
	BUILD_SET_PAGE_DEFAULT_FILTERS,
	categoricalAttributesName,
	CSVFormat,
	finalExportFileName,
	localStorageDefineTargetAudienceFilter,
	localStorageSearchTermSetKey,
	rangeAttributesName,
	routes
} from '../../constants';
import useLocalStorage from '../../hooks/useLocalStorage';
import useRevealSearchTermsFilter from '../revealInformationPage/hooks/useRevealSearchTermsFilter';
import useMultipleSelectionTable from '../../hooks/useMultipleSelectionTable';
import exportJsonOrCSVFile from '../../services/db/utils/exportJsonOrCSVFile';
import prepareDataToFinalExport from './utils/prepareDataToExport';
import { useNavigate } from 'react-router-dom';
import transformAudienceFilter from '../utils/transformAudienceFilter';

const columns = [
	{ label: 'Search Term', accessor: 'searchTerm', sortable: true, sortByOrder: 'asc' },
	{ label: 'Information Need', accessor: 'infoNeed', sortable: true },
	{ label: 'Need Probability', accessor: 'needProbability', sortable: true, numeric: true }
];

const BuildSetPageContainer = () => {
	const { getSearchTermSet } = useIndexedDBService();
	const [searchTermSet, setSearchTermSet] = useLocalStorage(localStorageSearchTermSetKey, []);
	const [audienceDefinitions, setAudienceDefinitions] = useLocalStorage(audienceDefinitionsStorageKey, []);
	const [audienceFilter] = useLocalStorage(localStorageDefineTargetAudienceFilter, null);
	const navigate = useNavigate();
	const foundedSearchTerms = useLiveQuery(
		() => getSearchTermSet(searchTermSet),
		[searchTermSet]
	);

	const { selectedItems, onClearSelectedItems, onToggleSelect, setSelectedItems } = useMultipleSelectionTable();
	const [page, setPage] = useState(0);

	const onReset = () => {
		onClearSelectedItems();
		setPage(0);
	};

	const {
		filteredTerms,
		onChangeFilters,
		filterValues,
		setFilterValues
	} = useRevealSearchTermsFilter(BUILD_SET_PAGE_DEFAULT_FILTERS, foundedSearchTerms, onReset);

	const handleSelectAll = useCallback((e) => {
		if (e.target.checked) {
			const newSelected = filteredTerms.map(row => row.searchTerm);
			return setSelectedItems(newSelected);
		}
		onClearSelectedItems();
	}, [filteredTerms, setSelectedItems, onClearSelectedItems]);

	const handleChangePage = useCallback(
		(event, newPage) => setPage(newPage),
		[]
	);

	const onDeleteSearchTermsSetItems = useCallback(
		() => {
			const newTermSet = searchTermSet.filter(term => !selectedItems.includes(term));
			const filteredAudienceDefinitions = audienceDefinitions.reduce((acc, def) => {
				const filteredTerms = def.terms.filter(term => newTermSet.includes(term));

				if (!filteredTerms.length) {
					return acc;
				}

				return [...acc, { ...def, terms: filteredTerms }];
			}, []);

			setAudienceDefinitions(filteredAudienceDefinitions);
			setSearchTermSet(newTermSet);
			setFilterValues(BUILD_SET_PAGE_DEFAULT_FILTERS);
			if (!newTermSet.length) {
				navigate(routes.revealInformation);
			}
		},
		[
			searchTermSet,
			selectedItems,
			setSearchTermSet,
			setFilterValues,
			audienceDefinitions,
			setAudienceDefinitions,
			navigate
		]
	);

	const onExportBtnClick = useCallback(() => {
		const definitionsFilters = audienceDefinitions.map(def => def.filter);
		const preparedDataToCSVExport = prepareDataToFinalExport(definitionsFilters, foundedSearchTerms);
		exportJsonOrCSVFile(preparedDataToCSVExport, CSVFormat.format, finalExportFileName);
	}, [audienceDefinitions, foundedSearchTerms]);

	const transformedAudienceFilter = useMemo(() => {
		if (audienceFilter) {
			return transformAudienceFilter(audienceFilter.filterItems);
		}
	}, [audienceFilter]);

	if (!filteredTerms) {
		return <AppBackdrop open={!filteredTerms}/>;
	}

	return (
		<BuildSetPageStyled>
			<BuildSetPageHeadStyled>
				<Typography textAlign='center' variant='h4' component='h1'>
					Build search term set
				</Typography>
			</BuildSetPageHeadStyled>

			<BuildSetPageBodyStyled>
				<BuildSetCard
					title='Build your own set of search terms'
					infoTitle='Selected respondent attributes'
					rangeInfoTitle='Selected range attributes'
					categoricalInfoTitle='Selected categorical attributes'
					boolInfoTitle='Selected boolean attributes'

					categoricalAttr={transformedAudienceFilter?.[categoricalAttributesName] || []}
					booleanAttr={transformedAudienceFilter?.[boolAttributesName] || []}
					rangeAttr={transformedAudienceFilter?.[rangeAttributesName] || []}

					tableData={filteredTerms}
					onSelectAllClick={handleSelectAll}
					onRowClick={onToggleSelect}

					onClearAll={onClearSelectedItems}
					onRemoveBtnClick={onDeleteSearchTermsSetItems}
					onExportBtnClick={onExportBtnClick}

					onChangePage={handleChangePage}

					{...{ filterValues, columns, selectedItems, page, onChangeFilters }}
				/>
			</BuildSetPageBodyStyled>
		</BuildSetPageStyled>
	);
};

export default BuildSetPageContainer;