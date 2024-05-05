import React from 'react';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';

const StatisticTable = ({ children, headings }) => {
	const headingsMarkup = headings.map(({ label, ...props }) => (
		<TableCell key={label} {...props}>
			{label}
		</TableCell>
	));

	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: '100%' }} aria-label="simple table">
				<TableHead>
					<TableRow>{headingsMarkup}</TableRow>
				</TableHead>
				<TableBody>{children}</TableBody>
			</Table>
		</TableContainer>
	);
};

export default StatisticTable;
