import React, { memo } from 'react';
import Box from '@mui/material/Box';
import RangeSliderStyled from './rangeSlider.styled';

const RangeSlider = ({ value, handleChange, dataType, ...props }) => {
	return (
		<Box>
			<RangeSliderStyled
				value={value}
				onChange={handleChange}
				valueLabelDisplay='on'
				disableSwap
				step={5}
				{...props}
			/>
		</Box>

	);
};

export default memo(RangeSlider);