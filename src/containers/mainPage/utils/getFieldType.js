const getFieldType = (value) => {
	const valueType = typeof value;

	if (valueType === 'object' || Array.isArray(value) || valueType === 'function') {
		return '';
	}

	if (value === 0 || value === 1) {
		return 'boolean';
	}

	return valueType;
};

export default getFieldType;