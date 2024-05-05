import React from 'react';
import IdentifyRelevantSearchTermStyled, {
	IdentifyRelevantSearchTermBodyStyled,
	IdentifyRelevantSearchTermHeadStyled
} from './identifyRelevantSearchTerm.styled';
import IdentifyFilters from '../identifyFilters/IdentifyFilters';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import BaseTable from '../../../../components/baseTable/BaseTable';
import TableToolbar from '../../../../components/baseTable/components/toolbar/TableToolbar';
import Button from '../../../../components/button/Button';
import {
	addToSearchTermsSetHelperText,
	rowsPerPageOnRevealTable
} from '../../../../constants';
import HelpTooltip from '../../../../components/helpTooltip/HelpTooltip';

const IdentifyRelevantSearchTerm = ({
	filterValues,
	onChangeFilters,
	tableData,
	title,
	selectedItems,
	onActionBtnClick,
	onClearAll,
	...tableProps
}) => {
	const numSelected = selectedItems.length;

	const toolbarActionsMarkup = [
		<Stack direction="row" spacing={1} alignItems="center" key="AddToSet">
			<Button
				size="small"
				variant="contained"
				label="Add to Search Term Set"
				disabled={!numSelected}
				onClick={onActionBtnClick}
			/>
			<HelpTooltip title={addToSearchTermsSetHelperText} />
		</Stack>
	];

	const contentMarkup = !!tableData?.length && (
		<Stack flexGrow={1}>
			<TableToolbar
				hasSelected={!!numSelected}
				label={`${numSelected} selected search term`}
				actions={toolbarActionsMarkup}
				onClearAll={onClearAll}
			/>
			<BaseTable
				{...{
					...tableProps,
					selectedItems,
					tableData,
					rowsPerPage: rowsPerPageOnRevealTable
				}}
			/>
		</Stack>
	);

	const noResultMessage = !tableData?.length && (
		<Box p="2rem">
			<Typography textAlign="center">No search results</Typography>
		</Box>
	);

	const spinner = !tableData && (
		<Stack p="2rem" direction="row" justifyContent="center" width="100%">
			<CircularProgress />
		</Stack>
	);

	return (
		<IdentifyRelevantSearchTermStyled>
			<IdentifyRelevantSearchTermHeadStyled id="draggable-dialog-title">
				<Typography variant="h6" textAlign="center">
					{title}
				</Typography>
			</IdentifyRelevantSearchTermHeadStyled>

			<IdentifyRelevantSearchTermBodyStyled spacing={2}>
				<IdentifyFilters {...{ filterValues, onChangeFilters }} />
				{spinner}
				{noResultMessage}
				{contentMarkup}
			</IdentifyRelevantSearchTermBodyStyled>
		</IdentifyRelevantSearchTermStyled>
	);
};

export default IdentifyRelevantSearchTerm;
