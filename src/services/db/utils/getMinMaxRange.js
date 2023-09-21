const getMetaKeysValuesRange = (metaKeyValues) => {
	return metaKeyValues.reduce((acc, { value }) => {
		const min = Math.min(acc[0], value);
		const max = Math.max(acc[1], value);

		return [min, max];
	}, [metaKeyValues[0].value, 0]);
};

export default getMetaKeysValuesRange;