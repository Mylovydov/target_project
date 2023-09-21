import { styled } from '@mui/material';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

const FormFieldsItemStyled = styled(Box, {
	name: 'FormFieldsItem',
	slot: 'Root'
})({
	width: '100%',
	alignItems: 'center',
	display: 'flex',
	gap: '1.5rem'
});

export const FormFieldsItemLabelStyled = styled(Stack, {
	name: 'FormFieldsItemLabel',
	slot: 'Root'
})({
	flex: '1'
});

export const FormFieldsItemActionStyled = styled(Box, {
	name: 'FormFieldsItemAction',
	slot: 'Root'
})({
	flex: '3',
	width: '100%',
	alignItems: 'center',
	display: 'flex',
	gap: '2rem'
});

export default FormFieldsItemStyled;