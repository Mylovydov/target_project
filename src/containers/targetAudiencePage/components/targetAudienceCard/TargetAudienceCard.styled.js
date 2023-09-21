import { styled } from '@mui/material';
import Stack from '@mui/material/Stack';

export const BodyItemStyled = styled(Stack, {
	name: 'BodyItem',
	slot: 'Root'
})(({ theme }) => ({
	padding: '0 0 2rem 0',
	'&:not(:first-of-type)': {
		padding: '2rem 0',
		borderTop: `1px solid ${theme.palette.grey[300]}`
	}
}));

