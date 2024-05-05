import React, { useState } from 'react';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { Checkbox } from '@mui/material';
import TableSortLabel from '@mui/material/TableSortLabel';

const BaseTableHead = ({
	columns,
	numSelected,
	onSelectAllClick,
	rowCount,
	handleSorting
}) => {
	const [sortField, setSortField] = useState('');
	const [order, setOrder] = useState('asc');

	const handleSortingChange = accessor => {
		const sortOrder =
			accessor === sortField && order === 'asc' ? 'desc' : 'asc';
		setSortField(accessor);
		setOrder(sortOrder);
		handleSorting(accessor, sortOrder);
	};

	return (
		<TableHead>
			<TableRow>
				<TableCell padding="checkbox">
					<Checkbox
						color="primary"
						indeterminate={numSelected > 0 && numSelected < rowCount}
						checked={rowCount > 0 && numSelected === rowCount}
						onChange={onSelectAllClick}
						inputProps={{
							'aria-label': 'select all desserts'
						}}
					/>
				</TableCell>
				{columns.map(({ label, accessor, sortable, numeric }) => {
					const align = numeric ? 'right' : 'left';
					return sortable ? (
						<TableCell
							key={accessor}
							align={align}
							sortDirection={sortField === accessor ? order : false}
						>
							<TableSortLabel
								active={sortField === accessor}
								direction={
									sortField === accessor && order === 'asc' ? order : 'desc'
								}
								onClick={() => handleSortingChange(accessor)}
							>
								{label}
							</TableSortLabel>
						</TableCell>
					) : (
						<TableCell key={accessor} align={align}>
							{label}
						</TableCell>
					);
				})}
			</TableRow>
		</TableHead>
	);
};

export default BaseTableHead;
