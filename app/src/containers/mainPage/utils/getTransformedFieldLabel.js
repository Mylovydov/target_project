const getTransformedFieldLabel = fieldName => {
	return fieldName
		.split('_')
		.map(word => {
			return `${word.charAt(0).toUpperCase()}${word.slice(1)}`;
		})
		.join(' ');
};

export default getTransformedFieldLabel;
