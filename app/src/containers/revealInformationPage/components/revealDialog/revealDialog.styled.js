import { styled } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

const RevealDialogStyled = styled(Dialog, {
	name: 'RevealDialog',
	slot: 'Root'
})({});

export const RevealDialogBodyStyled = styled(Box, {
	name: 'RevealDialogBody',
	slot: 'Root'
})({
	flex: '1 1 auto',
	display: 'flex',
	padding: '3rem 3rem 0'
});

export const RevealDialogFooterStyled = styled(Stack, {
	name: 'RevealDialogFooter',
	slot: 'Root'
})({
	padding: '2rem 3rem 3rem'
});

export default RevealDialogStyled;
