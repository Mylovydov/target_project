import { memo } from 'react';
import RangeSlider from '../../../../components/rangeSlider/RangeSlider';
import { FormTextStyled } from '../defineAudienceForm/defineAudienceForm.styled';
import RangeAttributeItemStyled from './rangeAttributeItem.styled';

const RangeAttributeItem = ({ label, name, min, max, value, onChange }) => (
	<RangeAttributeItemStyled>
		<FormTextStyled variant="h6" sx={{ mb: '2rem' }} className="label">
			{label}
		</FormTextStyled>
		<RangeSlider
			step={1}
			name={name}
			min={min}
			max={max}
			value={value}
			handleChange={onChange}
		/>
	</RangeAttributeItemStyled>
);

export default memo(RangeAttributeItem);
