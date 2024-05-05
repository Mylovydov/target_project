import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import DefineTypeFormStyled, {
	DefineTypeFormBodyStyled,
	DefineTypeFormFooterStyled,
	DefineTypeFormHeadStyled
} from './defineTypeForm.styled';
import FormFieldsItem from '../formFieldsItem/FormFieldsItem';
import Button from '../../../../components/button/Button';
import transformTypedFields from '../../utils/transformTypedFields';

const getNewChangedField = (oldField, oldInput, fieldName, newFieldValue) => ({
	...oldField,
	[fieldName]: {
		...oldInput,
		value: newFieldValue
	}
});

const DefineTypeForm = ({
	formFields,
	title,
	onSubmit,
	uploadBtnLabel,
	cancelBtnLabel,
	onClose,
	subtitle
}) => {
	const [fields, setFields] = useState(formFields);

	const handleSubmit = e => {
		e.preventDefault();

		if (onSubmit) {
			const transformedFieldsInfo = transformTypedFields(fields);
			onSubmit(transformedFieldsInfo);
			onClose();
		}
	};

	const onFieldValueChange = (key, e) => {
		const target = e.target;
		const fieldName = target.name;
		const selectedField = fields[key];
		const selectedInput = selectedField[fieldName];

		let fieldValue =
			fieldName === 'categoricalInput' ? target.checked : target.value;

		const changedField = getNewChangedField(
			selectedField,
			selectedInput,
			fieldName,
			fieldValue
		);

		setFields(prevFields => ({
			...prevFields,
			[key]: changedField
		}));
	};

	const onTextFieldValueChange = (key, e) => {
		const fieldValue = e.target.value;
		const fieldName = e.target.name;

		const selectedField = fields[key];
		const selectedInput = selectedField[fieldName];

		const changedField = getNewChangedField(
			selectedField,
			selectedInput,
			fieldName,
			fieldValue
		);

		setFields(prevFields => ({
			...prevFields,
			[key]: changedField
		}));
	};

	return (
		<DefineTypeFormStyled
			component="form"
			autoComplete="off"
			onSubmit={handleSubmit}
		>
			<DefineTypeFormHeadStyled>
				<Typography variant="h6" textAlign="center">
					{title}
				</Typography>
				<Typography textAlign="center">{subtitle}</Typography>
			</DefineTypeFormHeadStyled>

			<DefineTypeFormBodyStyled>
				<Stack spacing="1.5rem">
					{Object.entries(fields).map(([fieldName, fieldInputs]) => (
						<FormFieldsItem
							key={fieldName}
							fieldName={fieldName}
							fieldInputs={fieldInputs}
							onFieldValueChange={onFieldValueChange}
							onTextFieldValueChange={onTextFieldValueChange}
						/>
					))}
				</Stack>
			</DefineTypeFormBodyStyled>
			<DefineTypeFormFooterStyled>
				<Stack direction="row" spacing={2}>
					<Button
						type="button"
						color="error"
						onClick={onClose}
						label={cancelBtnLabel}
					/>
					<Button variant="contained" label={uploadBtnLabel} />
				</Stack>
			</DefineTypeFormFooterStyled>
		</DefineTypeFormStyled>
	);
};

export default DefineTypeForm;
