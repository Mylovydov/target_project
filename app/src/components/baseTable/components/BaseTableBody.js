import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { Checkbox } from '@mui/material';
import React from 'react';

const BaseTableBody = ({
	tableData = [],
	columns,
	selectedItems,
	onRowClick
}) => {
	const isRowSelected = name => selectedItems.includes(name);

	return (
		<TableBody>
			{tableData.map(row => {
				const isCurrentRowSelected = isRowSelected(row.searchTerm);
				return (
					<TableRow
						hover
						key={row.id}
						role="checkbox"
						onClick={e => onRowClick(e, row.searchTerm)}
						aria-checked={isCurrentRowSelected}
						selected={isCurrentRowSelected}
						tabIndex={-1}
						sx={{ cursor: 'pointer' }}
					>
						<TableCell padding="checkbox">
							<Checkbox checked={isCurrentRowSelected} />
						</TableCell>
						{columns.map(({ accessor, numeric }) => {
							let rowValue = row[accessor];
							if (rowValue) {
								rowValue = numeric ? rowValue.toFixed(2) : rowValue;
							} else {
								rowValue = '——';
							}

							return (
								<TableCell
									key={accessor}
									sx={{ padding: '1rem' }}
									align={numeric ? 'right' : 'left'}
								>
									{rowValue}
								</TableCell>
							);
						})}
					</TableRow>
				);
			})}
		</TableBody>
	);
};

export default BaseTableBody;
