import { styled } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';

const CheckboxStyled = styled(FormControlLabel, {
	name: 'Checkbox',
	slot: 'Root'
})({
	'& .MuiFormControlLabel-label': {
		fontSize: '1.4rem'
	},
	'& .MuiCheckbox-root': {
		padding: '.5rem .5rem .5rem 1rem'
	}
})

export default CheckboxStyled;