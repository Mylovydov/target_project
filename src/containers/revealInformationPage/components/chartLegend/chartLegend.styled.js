import { styled } from '@mui/material';

const ChartLegendStyled = styled('ul', {
	name: 'ChartLegend',
	slot: 'Root'
})({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	gap: '6rem',
	listStyle: 'none',
	margin: 0,
	padding: 0,
});

export const ChartLegendItemStyled = styled('li', {
	name: 'ChartLegendItem',
	slot: 'Root'
})({});

export default ChartLegendStyled;