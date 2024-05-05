import { alpha, styled } from '@mui/material';
import Stack from '@mui/material/Stack';

const InfoSpaceStyled = styled(Stack, {
	name: 'InfoSpace',
	slot: 'Root'
})(({ theme }) => ({
	backgroundColor: alpha(theme.palette.warning.light, 0.1),
	padding: '1.5rem',
	width: '100%'
}));

export default InfoSpaceStyled;
