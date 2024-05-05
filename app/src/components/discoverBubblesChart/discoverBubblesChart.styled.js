import { styled } from '@mui/material';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

const DiscoverBubblesStyled = styled(Stack, {
	name: 'DiscoverBubbles',
	slot: 'Root'
})({});

export const DiscoverBubblesChartStyled = styled(Box, {
	name: 'DiscoverBubblesChart',
	slot: 'Root'
})({
	position: 'relative'
});

export const DiscoverBubblesLegendStyled = styled(Stack, {
	name: 'DiscoverBubblesLegend',
	slot: 'Root'
})({
	padding: '2rem'
});

export default DiscoverBubblesStyled;
