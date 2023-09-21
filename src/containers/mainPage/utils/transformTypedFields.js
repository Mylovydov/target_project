const transformTypedFields = (obj) => {
	const entries = Object
		.entries(obj)
		.map(([fieldName, { categoricalInput, labelInput, typeInput }]) => {
			return [
				fieldName,
				{
					name: fieldName,
					label: labelInput.value,
					type: typeInput.value,
					isCategorical: +categoricalInput.value
				}
			];
		});

	return Object.fromEntries(entries);
};

export default transformTypedFields;