import React from 'react';
import BuildSetStyled, { BuildSetBodyStyled, BuildSetHeadStyled } from './buildSet.styled';
import Typography from '@mui/material/Typography';
import IdentifyFilters from '../../../revealInformationPage/components/identifyFilters/IdentifyFilters';
import BaseTable from '../../../../components/baseTable/BaseTable';
import TableToolbar from '../../../../components/baseTable/components/toolbar/TableToolbar';
import Button from '../../../../components/button/Button';
import {
	exportSearchTermsSetHelperText,
	removeSelectedTermsHelperText,
	rowsPerPageOnBuildTable
} from '../../../../constants';
import Stack from '@mui/material/Stack';
import HelpTooltip from '../../../../components/helpTooltip/HelpTooltip';
import Box from '@mui/material/Box';

const BuildSet = (
	{
		title,
		filterValues,
		onChangeFilters,
		selectedItems,
		onClearAll,
		onRemoveBtnClick,
		onExportBtnClick,
		tableData,
		...tableProps
	}
) => {
	const numSelected = selectedItems.length;

	const toolbarActionsMarkup = [
		<Stack direction='row' spacing={1} alignItems='center' key='remove'>
			<Button
				color='error'
				size='small'
				variant='contained'
				label='Remove from the set'
				onClick={onRemoveBtnClick}
				disabled={!numSelected}
			/>
			<HelpTooltip title={removeSelectedTermsHelperText}/>
		</Stack>,
		<Stack direction='row' spacing={1} alignItems='center' key='export'>
			<Button
				size='small'
				variant='contained'
				color='success'
				label='Export search term set'
				onClick={onExportBtnClick}
				disabled={!tableData.length}
			/>
			<HelpTooltip title={exportSearchTermsSetHelperText}/>
		</Stack>
	];

	const contentMarkup = !!tableData?.length && (
		<Stack flexGrow={1}>
			<TableToolbar
				hasSelected={numSelected}
				label={`${numSelected} selected search term`}
				actions={toolbarActionsMarkup}
				onClearAll={onClearAll}
			/>
			<BaseTable
				{...{ ...tableProps, tableData, selectedItems, rowsPerPage: rowsPerPageOnBuildTable }}
			/>
		</Stack>
	);

	const noResultMessage = !tableData?.length && (
		<Box p='2rem'><Typography textAlign='center'>No search results</Typography></Box>);

	return (
		<BuildSetStyled spacing={3}>
			<BuildSetHeadStyled>
				<Typography variant='h6' textAlign='center'>
					{title}
				</Typography>
			</BuildSetHeadStyled>

			<BuildSetBodyStyled spacing={2} flexGrow={1}>
				<IdentifyFilters
					filterValues={filterValues}
					onChangeFilters={onChangeFilters}
				/>
				{contentMarkup}
				{noResultMessage}
			</BuildSetBodyStyled>
		</BuildSetStyled>
	);
};

export default BuildSet;