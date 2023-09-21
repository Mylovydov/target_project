import React, { useCallback, useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

function descendingComparator(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

function getComparator(order, orderBy) {
	return order === 'desc'
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) {
			return order;
		}
		return a[1] - b[1];
	});
	return stabilizedThis.map((el) => el[0]);
}

const DEFAULT_ORDER = 'desc';
const DEFAULT_ORDER_BY = 'needProbability';
const DEFAULT_ROWS_PER_PAGE = 10;

const EnhancedTableHead = (props) => {
	const { order, orderBy, onRequestSort, headCells } = props;
	const createSortHandler = (newOrderBy) => (event) => {
		onRequestSort(event, newOrderBy);
	};

	return (
		<TableHead>
			<TableRow>
				{headCells.map(({ id, numeric, label }) => (
					<TableCell
						key={id}
						align={numeric ? 'right' : 'left'}
						sortDirection={orderBy === id ? order : false}
					>
						<TableSortLabel
							active={orderBy === id}
							direction={orderBy === id ? order : 'asc'}
							onClick={createSortHandler(id)}
						>
							{label}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
};

const SortableTable = ({ tableHeadings, tableRows }) => {
	const [order, setOrder] = useState(DEFAULT_ORDER);
	const [orderBy, setOrderBy] = useState(DEFAULT_ORDER_BY);
	const [page, setPage] = useState(0);
	const [visibleRows, setVisibleRows] = useState(null);
	const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);

	useEffect(() => {
		let rowsOnMount = stableSort(
			tableRows,
			getComparator(DEFAULT_ORDER, DEFAULT_ORDER_BY)
		);

		rowsOnMount = rowsOnMount.slice(
			0,
			rowsPerPage
		);
		setPage(0);

		setVisibleRows(() => rowsOnMount);
	}, [tableRows, rowsPerPage]);

	const handleRequestSort = useCallback(
		(event, newOrderBy) => {
			const isAsc = orderBy === newOrderBy && order === 'asc';
			const toggledOrder = isAsc ? 'desc' : 'asc';
			setOrder(toggledOrder);
			setOrderBy(newOrderBy);

			const sortedRows = stableSort(tableRows, getComparator(toggledOrder, newOrderBy));
			const updatedRows = sortedRows.slice(
				page * rowsPerPage,
				page * rowsPerPage + rowsPerPage
			);

			setVisibleRows(updatedRows);
		},
		[order, orderBy, page, rowsPerPage, tableRows]
	);

	const handleChangePage = useCallback(
		(event, newPage) => {
			setPage(() => newPage);

			const sortedRows = stableSort(tableRows, getComparator(order, orderBy));
			const updatedRows = sortedRows.slice(
				newPage * rowsPerPage,
				newPage * rowsPerPage + rowsPerPage
			);

			setVisibleRows(() => updatedRows);
		},
		[order, orderBy, rowsPerPage, tableRows]
	);

	const handleChangeRowsPerPage = useCallback(
		(event) => {
			const updatedRowsPerPage = parseInt(event.target.value, 10);
			setRowsPerPage(() => updatedRowsPerPage);

			setPage(0);

			const sortedRows = stableSort(tableRows, getComparator(order, orderBy));
			const updatedRows = sortedRows.slice(0, updatedRowsPerPage);

			setVisibleRows(() => updatedRows);
		},
		[order, orderBy, tableRows]
	);

	return (
		<Box sx={{ width: '100%' }}>
			<Paper sx={{ width: '100%' }}>
				<TableContainer>
					<Table
						aria-labelledby='tableTitle'
					>
						<EnhancedTableHead
							order={order}
							orderBy={orderBy}
							onRequestSort={handleRequestSort}
							rowCount={tableRows.length}
							headCells={tableHeadings}
						/>
						<TableBody>
							{visibleRows
								? visibleRows.map((row) => {
									return (
										<TableRow
											tabIndex={-1}
											key={row.searchTerm}
										>
											<TableCell
												component='th'
												scope='row'
											>
												<Typography variant='caption'>{row.searchTerm}</Typography>
											</TableCell>
											<TableCell component='th' align='right'>{row.needProbability}</TableCell>
										</TableRow>
									);
								})
								: null}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					component='div'
					rowsPerPageOptions={[5, 10, 25]}
					count={tableRows.length}
					rowsPerPage={rowsPerPage}
					page={page}
					labelRowsPerPage='Per:'
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
					sx={{
						'& .MuiInputBase-root': {
							mr: '1rem',
							ml: 0
						},
						'& .MuiTablePagination-actions': {
							ml: '1.5rem'
						}
					}}
				/>
			</Paper>
		</Box>
	);
};

export default SortableTable;