import { Box, styled } from '@mui/material';

const RevealInformationPageStyled = styled('section', {
	name: 'RevealInformationPage',
	slot: 'Root'
})({});

export const RevealInformationPageHeadStyled = styled(Box, {
	name: 'RevealInformationPageHead',
	slot: 'Root'
})({});

export const RevealInformationPageLegendStyled = styled(Box, {
	name: 'RevealInformationPageLegend',
	slot: 'Root'
})({
	marginTop: '2rem'
});

export const RevealInformationPageBodyStyled = styled(Box, {
	name: 'RevealInformationPageBody',
	slot: 'Root'
})({
	marginTop: '2rem'
});

export const RevealInformationPageFooterStyled = styled(Box, {
	name: 'RevealInformationPageFooter',
	slot: 'Root'
})({
	marginTop: '5rem'
});

export default RevealInformationPageStyled;
