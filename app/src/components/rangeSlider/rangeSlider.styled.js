import { styled } from '@mui/material';
import Slider from '@mui/material/Slider';

const RangeSliderStyled = styled(Slider, {
	name: 'RangeSlider',
	slot: 'Root'
})(({ theme }) => ({
	'& .MuiSlider-valueLabel': {
		fontSize: 12,
		fontWeight: 'normal',
		top: -2,
		backgroundColor: 'unset',
		color: theme.palette.text.primary,
		'&:before': {
			display: 'none'
		},
		'& *': {
			background: 'transparent',
			color: theme.palette.mode === 'dark' ? '#fff' : '#000'
		}
	}
}));

export default RangeSliderStyled;
