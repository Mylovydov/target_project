import { Box, Stack, styled } from '@mui/material';

export const CardStyled = styled(Stack, {
	name: 'Card',
	slot: 'Root'
})({});

export const CardInfoStyled = styled(Box, {
	name: 'CardInfo',
	slot: 'Root'
})(({ theme, ...rest }) => ({
	flex: `0 0 ${rest.width}`,
	borderRight: `1px solid ${theme.palette.grey[300]}`
}));

export const CardActionsStyled = styled(Box, {
	name: 'CardActions',
	slot: 'Root'
})(({ theme, ...rest }) => ({
	flex: '1 1 auto',
	position: 'relative',
	padding: rest.padding
}));
