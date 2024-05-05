const validateRespondentField = (
	respondent,
	requiredField,
	requiredType,
	index
) => {
	let error = '';

	if (!respondent.hasOwnProperty(requiredField)) {
		error = `Object number ${index} is missing ${requiredField} field`;
	} else if (typeof respondent[requiredField] !== requiredType) {
		error = `Object number ${index} has ${requiredField} field that is not a ${requiredType}`;
	}

	return error;
};

const validateFields = [
	{ field: 'user_id', type: 'string' },
	{ field: 'search_term', type: 'string' },
	{ field: 'info_need', type: 'string' },
	{ field: 'need_probability', type: 'number' },
	{ field: 'need_id', type: 'number' }
];

const validateFile = file => {
	const errors = [];

	for (let i = 0; i < file.length; i++) {
		const respondent = file[i];
		const objectIndex = i + 1;

		validateFields.forEach(({ field, type }) => {
			const error = validateRespondentField(
				respondent,
				field,
				type,
				objectIndex
			);
			if (error) {
				errors.push(error);
			}
		});

		if (errors.length) {
			break;
		}
	}

	return errors.join('; ');
};

export default validateFile;
