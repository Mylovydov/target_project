const defaultTransformedFields = {
	user_id: {
		typeInput: { name: 'typeInput', value: 'string', disabled: true },
		labelInput: { name: 'labelInput', value: 'Respondent', disabled: true },
		categoricalInput: { name: 'categoricalInput', value: false, disabled: true }
	},
	search_term: {
		typeInput: { name: 'typeInput', value: 'string', disabled: true },
		labelInput: { name: 'labelInput', value: 'Search Term', disabled: true },
		categoricalInput: { name: 'categoricalInput', value: false, disabled: true }
	},
	info_need: {
		typeInput: { name: 'typeInput', value: 'string', disabled: true },
		labelInput: {
			name: 'labelInput',
			value: 'Information Need',
			disabled: true
		},
		categoricalInput: { name: 'categoricalInput', value: false, disabled: true }
	},
	need_probability: {
		typeInput: { name: 'typeInput', value: 'number', disabled: true },
		labelInput: { name: 'labelInput', value: 'Probability', disabled: true },
		categoricalInput: { name: 'categoricalInput', value: false, disabled: true }
	},
	need_id: {
		typeInput: { name: 'typeInput', value: 'number', disabled: true },
		labelInput: {
			name: 'labelInput',
			value: 'Information Need ID',
			disabled: true
		},
		categoricalInput: { name: 'categoricalInput', value: false, disabled: true }
	}
};

export default defaultTransformedFields;
