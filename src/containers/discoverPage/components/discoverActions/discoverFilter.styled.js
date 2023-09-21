import { Stack, styled } from '@mui/material';

export const DiscoverActionsStyled = styled(Stack, {
	name: 'DiscoverActions',
	slot: 'Root'
})({
	height: '100%',
	padding: '3rem',
});

export const DiscoverActionsHeadStyled = styled(Stack, {
	name: 'DiscoverActionsHead',
	slot: 'Root'
})({});

export const DiscoverActionsBodyStyled = styled(Stack, {
	name: 'DiscoverActionsBody',
	slot: 'Root'
})({
	flex: '1 1 auto'
});

export const DiscoverActionsFooterStyled = styled(Stack, {
	name: 'DiscoverActionsFooter',
	slot: 'Root'
})({
	marginTop: '4rem'
});

export const ActionsStyled = styled(Stack, {
	name: 'Actions',
	slot: 'Root'
})(({ theme }) => ({
	borderBottom: `1px solid ${theme.palette.grey[300]}`,
	padding: '0 0 2rem'
}));

