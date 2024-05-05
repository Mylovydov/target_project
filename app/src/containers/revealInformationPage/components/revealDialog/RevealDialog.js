import React, { useCallback, useState } from 'react';
import Draggable from 'react-draggable';
import Paper from '@mui/material/Paper';
import useIndexedDBService from '../../../../services/db/indexedDBService';
import { useLiveQuery } from 'dexie-react-hooks';
import {
	audienceDefinitionsStorageKey,
	localStorageDefineTargetAudienceFilter,
	REVEAL_DIALOG_DEFAULT_FILTERS
} from '../../../../constants';
import IdentifyRelevantSearchTerm from '../identifyRelevantSearchTerm/IdentifyRelevantSearchTerm';
import useMultipleSelectionTable from '../../../../hooks/useMultipleSelectionTable';
import useRevealSearchTermsFilter from '../../hooks/useRevealSearchTermsFilter';
import useAddTermToSearchTermSet from '../../hooks/addTermToSearchTermSet';
import useNotification from '../../../../hooks/useNotification';
import Button from '../../../../components/button/Button';
import RevealDialogStyled, {
	RevealDialogBodyStyled,
	RevealDialogFooterStyled
} from './revealDialog.styled';
import useLocalStorage from '../../../../hooks/useLocalStorage';

const PaperComponent = props => {
	return (
		<Draggable handle="#draggable-dialog-title">
			<Paper
				{...props}
				sx={{
					display: 'flex',
					flexDirection: 'column',
					minHeight: '90rem'
				}}
			/>
		</Draggable>
	);
};

const columns = [
	{ label: 'Search Term', accessor: 'searchTerm', sortable: true },
	{
		label: 'Need Probability',
		accessor: 'needProbability',
		sortable: true,
		numeric: true
	}
];

const RevealDialog = ({ open, onClose, selectedInfoNeedId, ...props }) => {
	const { getRelevantSearchTermByInfoNeed } = useIndexedDBService();
	const { addSearchTermSet } = useAddTermToSearchTermSet();
	const { open: openNotification } = useNotification();
	const [audienceDefinitions, setAudienceDefinitions] = useLocalStorage(
		audienceDefinitionsStorageKey,
		[]
	);
	const [audienceFilter] = useLocalStorage(
		localStorageDefineTargetAudienceFilter,
		null
	);
	const searchTermByInfoNeed = useLiveQuery(
		() => getRelevantSearchTermByInfoNeed(selectedInfoNeedId),
		[selectedInfoNeedId]
	);

	const {
		selectedItems,
		onClearSelectedItems,
		onToggleSelect,
		setSelectedItems
	} = useMultipleSelectionTable();

	const onHandleCloseDialog = () => {
		if (!onClose) {
			return;
		}

		if (!selectedItems.length) {
			return onClose();
		}

		const isCloseConfirm = window.confirm(
			'Selected searches will be reset if you close the popup window. Do you want to continue?'
		);
		isCloseConfirm && onClose();
	};

	const [page, setPage] = useState(0);

	const onReset = () => {
		onClearSelectedItems();
		setPage(0);
	};

	const { filteredTerms, onChangeFilters, filterValues } =
		useRevealSearchTermsFilter(
			REVEAL_DIALOG_DEFAULT_FILTERS,
			searchTermByInfoNeed,
			onReset
		);

	const handleSelectAll = useCallback(
		e => {
			if (e.target.checked) {
				const newSelected = filteredTerms.map(row => row.searchTerm);
				return setSelectedItems(newSelected);
			}
			onClearSelectedItems();
		},
		[filteredTerms, setSelectedItems, onClearSelectedItems]
	);

	const onSubmitSearchTermSet = useCallback(() => {
		if (!audienceFilter) {
			return;
		}

		addSearchTermSet(selectedItems);
		onClearSelectedItems();
		openNotification({
			message: 'Search terms were successfully added to set',
			variant: 'success'
		});

		const definition = audienceDefinitions.find(
			def => def.id === audienceFilter.id
		);

		if (definition) {
			const updatedDefinition = {
				...definition,
				terms: [...definition.terms, ...selectedItems]
			};
			const newAudienceDefinitions = audienceDefinitions.map(def =>
				def.id === definition.id ? updatedDefinition : def
			);
			return setAudienceDefinitions(newAudienceDefinitions);
		}

		const definitionFilter = audienceFilter.filterItems.reduce(
			(acc, { name, value }) => ({ ...acc, [name]: value }),
			{}
		);
		const newDefinition = {
			id: audienceFilter.id,
			terms: selectedItems,
			filter: definitionFilter
		};
		setAudienceDefinitions([...audienceDefinitions, newDefinition]);
	}, [
		addSearchTermSet,
		onClearSelectedItems,
		openNotification,
		selectedItems,
		setAudienceDefinitions,
		audienceFilter,
		audienceDefinitions
	]);

	const handleChangePage = useCallback(
		(event, newPage) => setPage(newPage),
		[]
	);

	return (
		<RevealDialogStyled
			PaperComponent={PaperComponent}
			fullWidth
			open={open}
			onClose={onHandleCloseDialog}
			maxWidth="md"
		>
			<RevealDialogBodyStyled>
				<IdentifyRelevantSearchTerm
					tableData={filteredTerms}
					onRowClick={onToggleSelect}
					onSelectAllClick={handleSelectAll}
					onClearAll={onClearSelectedItems}
					onActionBtnClick={onSubmitSearchTermSet}
					onChangePage={handleChangePage}
					{...{ onChangeFilters, filterValues, page, selectedItems, columns }}
					{...props}
				/>
			</RevealDialogBodyStyled>
			<RevealDialogFooterStyled alignItems="end">
				<Button
					onClick={onHandleCloseDialog}
					label="Close dialog"
					color="warning"
				/>
			</RevealDialogFooterStyled>
		</RevealDialogStyled>
	);
};

export default RevealDialog;
