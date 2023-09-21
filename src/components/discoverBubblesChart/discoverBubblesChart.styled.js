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
})({});

export const DiscoverBubblesHeadStyled = styled(Stack, {
	name: 'DiscoverBubblesHead',
	slot: 'Root'
})({
});

export const DiscoverBubblesLegendStyled = styled(Stack, {
	name: 'DiscoverBubblesLegend',
	slot: 'Root'
})({});

export default DiscoverBubblesStyled