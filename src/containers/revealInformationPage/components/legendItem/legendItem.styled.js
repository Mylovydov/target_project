import { styled } from '@mui/material';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

const LegendItemStyled = styled(Stack, {
	name: 'LegendItem',
	slot: 'Root'
})({});

export const LegendItemImgStyled = styled(Box, {
	name: 'LegendItemImg',
	slot: 'Root'
})({
	flex: '0 0 4rem'
});

export const LegendItemContentStyled = styled(Box, {
	name: 'LegendItemContent',
	slot: 'Root'
})({
	flex: '1 1 auto'
});

export const BarLegendItemStyled = styled(Box, {
	name: 'BarLegendItem',
	slot: 'Root'
})({
	width: '100%',
	height: '2rem',
	backgroundColor: 'rgb(154,208,245)'
});

export const StandardErrorLegendItemStyled = styled(Box, {
	name: 'StandardErrorLegendItem',
	slot: 'Root'
})({
	width: '100%',
	height: '2rem',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	position: 'relative'
});

export const StandardErrorLegendStyled = styled(Box, {
	name: 'StandardErrorLegend',
	slot: 'Root'
})(({ theme }) => ({
	width: '100%',
	height: '.2rem',
	backgroundColor: theme.palette.common.black,
	'&:before, &:after': {
		content: '""',
		position: 'absolute',
		top: '50%',
		transform: 'translateY(-50%)',
		width: '.2rem',
		height: '1rem',
		backgroundColor: theme.palette.common.black
	},
	'&:before': {
		left: 0,
	},
	'&:after': {
		right: 0,
	},
}));

export const LineLegendItemStyled = styled(Box, {
	name: 'LineLegendItem',
	slot: 'Root'
})(({ theme }) => ({
	width: '100%',
	border: `.2rem dashed ${theme.palette.error.main}`
}));

export default LegendItemStyled;