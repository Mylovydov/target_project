import React from 'react';
import Typography from '@mui/material/Typography';
import Select from '../../../../components/select/Select';
import {
	formFieldCategoricalHelperText,
	formFieldLabelHelperText,
	formFieldNameHelperText,
	formFieldTypeHelperText,
	possibleDataTypes
} from '../../../../constants';
import TextInput from '../../../../components/textInput/TextInput';
import Checkbox from '../../../../components/checkbox/Checkbox';
import FormFieldsItemStyled, { FormFieldsItemActionStyled, FormFieldsItemLabelStyled } from './formFieldsItem.styled';
import HelpTooltip from '../../../../components/helpTooltip/HelpTooltip';
import Stack from '@mui/material/Stack';

const FormFieldsItem = ({ fieldName, fieldInputs, onFieldValueChange, onTextFieldValueChange }) => {
	const { typeInput, labelInput, categoricalInput } = fieldInputs;

	return (
		<FormFieldsItemStyled>
			<FormFieldsItemLabelStyled direction='row' alignItems='center' spacing={1}>
				<Typography
					sx={{
						whiteSpace: 'nowrap'
					}}
					variant='body2'
				>
					{fieldName?.length > 40 ? `${fieldName.slice(0, 40)}...` : fieldName}
				</Typography>
				<HelpTooltip title={formFieldNameHelperText} />
			</FormFieldsItemLabelStyled>

			<FormFieldsItemActionStyled>
				<Stack spacing={1} direction='row' alignItems='center' width='100%' >
					<Select
						size='small'
						value={typeInput.value}
						emptyItem={false}
						onChange={(e) => onFieldValueChange(fieldName, e)}
						name={typeInput.name}
						disabled={typeInput.disabled}
						id={`${fieldName}-type-id`}
						label='Select type'
						options={possibleDataTypes}
					/>
					<HelpTooltip title={formFieldTypeHelperText} />
				</Stack>

				<Stack spacing={1} direction='row' alignItems='center' width='100%'>
					<TextInput
						fullWidth
						defaultValue={labelInput.value}
						disabled={labelInput.disabled}
						name={labelInput.name}
						id={`${fieldName}-label-id`}
						onBlur={(e) => onTextFieldValueChange(fieldName, e)}
						label='Select label'
					/>
					<HelpTooltip title={formFieldLabelHelperText} />
				</Stack>

				<Stack direction='row' alignItems='center'>
					<Checkbox
						label='Categorical'
						onChange={(e) => onFieldValueChange(fieldName, e)}
						id={`${fieldName}-categorical-id`}
						name={categoricalInput.name}
						checked={categoricalInput.value}
						disabled={categoricalInput.disabled}
					/>
					<HelpTooltip title={formFieldCategoricalHelperText} />
				</Stack>
			</FormFieldsItemActionStyled>
		</FormFieldsItemStyled>
	);
};

export default FormFieldsItem;