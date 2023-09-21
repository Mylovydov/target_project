import { Box, styled } from '@mui/material';

export const MainPageStyled = styled('section', {
	name: 'MainPage',
	slot: 'Root'
})({});

export const MainPageHeadStyled = styled(Box, {
	name: 'MainPageHead',
	slot: 'Root'
})({});

export const MainPageBodyStyled = styled(Box, {
	name: 'MainPageBody',
	slot: 'Root'
})({
	marginTop: '5rem'
});

export const MainPageFooterStyled = styled(Box, {
	name: 'MainPageFooter',
	slot: 'Root'
})({
	marginTop: '5rem'
});