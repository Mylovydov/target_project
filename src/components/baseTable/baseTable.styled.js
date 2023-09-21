import { styled } from '@mui/material';
import Stack from '@mui/material/Stack';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';

const BaseTableStyled = styled(Stack, {
	name: 'BaseTable',
	slot: 'Root'
})({
	flex: '1'
});

export const BaseTableContainerStyled = styled(TableContainer, {
	name: 'BaseTableContainer',
	slot: 'Root'
})({
	flex: '1 1 auto'
});

export const BaseTableComponentStyled = styled(Table, {
	name: 'BaseTableComponent',
	slot: 'Root'
})(({ theme }) => ({
	border: `.1rem solid ${theme.palette.grey[300]}`,
}));

export default BaseTableStyled;