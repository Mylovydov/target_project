import { styled } from '@mui/material';
import Box from '@mui/material/Box';

const DefineTypeFormStyled = styled(Box, {
	name: 'DefineTypeForm',
	slot: 'Root'
})({
	display: 'flex',
	flexDirection: 'column'
});

export const DefineTypeFormHeadStyled = styled(Box, {
	name: 'DefineTypeFormHead',
	slot: 'Root'
})(({ theme }) => ({
	padding: '2.5rem 2.5rem 2rem',
	borderBottom: `1px solid ${theme.palette.grey[300]}`
}));

export const DefineTypeFormBodyStyled = styled(Box, {
	name: 'DefineTypeFormBody',
	slot: 'Root'
})({
	maxHeight: '70vh',
	overflowY: 'auto',
	padding: '3rem 5rem'
});

export const DefineTypeFormFooterStyled = styled(Box, {
	name: 'DefineTypeFormFooter',
	slot: 'Root'
})(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-end',
	padding: '2.5rem',
	borderTop: `1px solid ${theme.palette.grey[300]}`
}));

export default DefineTypeFormStyled;
