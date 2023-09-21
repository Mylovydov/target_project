import { FormControl, FormGroup } from '@mui/material';
import { FormTextStyled } from '../defineAudienceForm/defineAudienceForm.styled';
import Checkbox from '../../../../components/checkbox/Checkbox';
import { memo } from 'react';

const CategoricalAttributeItem = ({ name, label, items, value, type, onChange }) => (
	<FormControl component='fieldset' variant='standard'>
		<FormTextStyled variant='h6' className='label'>
			{label}
		</FormTextStyled>
		<FormGroup sx={{ display: 'flex', flexDirection: 'row' }}>
			{items.map(label => (
				<Checkbox
					onChange={(e) => onChange(e, type, label)}
					checked={value.includes(label)}
					key={label}
					size='small'
					name={name}
					label={label}
				/>
			))}

		</FormGroup>
	</FormControl>
);

export default memo(CategoricalAttributeItem);