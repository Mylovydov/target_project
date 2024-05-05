import { Box, styled } from '@mui/material';

export const DiscoverPageStyled = styled('section', {
	name: 'DiscoverPage',
	slot: 'Root'
})({});

export const DiscoverPageBodyStyled = styled(Box, {
	name: 'DiscoverPageBody',
	slot: 'Root'
})({});

export const DiscoverPageFooterStyled = styled(Box, {
	name: 'DiscoverPageFooter',
	slot: 'Root'
})({
	marginTop: '5rem'
});
