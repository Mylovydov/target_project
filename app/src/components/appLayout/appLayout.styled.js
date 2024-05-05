import { styled } from '@mui/material';
import Box from '@mui/material/Box';

export const AppLayoutStyled = styled(Box, {
	name: 'AppLayout',
	slot: 'Root'
})({
	overflow: 'hidden',
	minHeight: '100vh',
	display: 'flex',
	flexDirection: 'column'
});

export const AppLayoutBodyStyled = styled(Box, {
	name: 'AppLayoutBody',
	slot: 'Root'
})({
	padding: '4rem 0',
	marginTop: '7rem'
});
