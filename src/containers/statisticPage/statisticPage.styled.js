import { styled } from '@mui/material';
import Box from '@mui/material/Box';

export const StatisticPageStyled = styled('section', {
	name: 'StatisticPage',
	slot: 'Root'
})({});

export const StatisticPageHeadStyled = styled(Box, {
	name: 'StatisticPageHead',
	slot: 'Root'
})({});

export const StatisticPageBodyStyled = styled(Box, {
	name: 'StatisticPageBody',
	slot: 'Root'
})({
	marginTop: '5rem'
});

export const StatisticPageFooterStyled = styled(Box, {
	name: 'StatisticPageFooter',
	slot: 'Root'
})({
	marginTop: '5rem'
});