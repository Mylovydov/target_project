import React, { useMemo } from 'react';
import useSortableTable from '../../hooks/useSortableTable';
import TablePagination from '@mui/material/TablePagination';
import BaseTableStyled, {
	BaseTableComponentStyled,
	BaseTableContainerStyled
} from './baseTable.styled';
import BaseTableHead from './components/BaseTableHead';
import BaseTableBody from './components/BaseTableBody';

const BaseTable = ({
	tableData,
	columns,
	selectedItems,
	onSelectAllClick,
	onRowClick,
	page,
	onChangePage,
	rowsPerPage = 10
}) => {
	const [sortedData, handleSorting] = useSortableTable(tableData, columns);

	const visibleRows = useMemo(
		() =>
			sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
		[page, sortedData, rowsPerPage]
	);

	return (
		<BaseTableStyled>
			<BaseTableContainerStyled>
				<BaseTableComponentStyled>
					<BaseTableHead
						columns={columns}
						handleSorting={handleSorting}
						numSelected={selectedItems.length}
						rowCount={sortedData.length}
						onSelectAllClick={onSelectAllClick}
					/>
					<BaseTableBody
						columns={columns}
						tableData={visibleRows}
						selectedItems={selectedItems}
						onRowClick={onRowClick}
					/>
				</BaseTableComponentStyled>
			</BaseTableContainerStyled>
			<TablePagination
				component="div"
				rowsPerPageOptions={[]}
				count={sortedData.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={onChangePage}
			/>
		</BaseTableStyled>
	);
};

export default BaseTable;
