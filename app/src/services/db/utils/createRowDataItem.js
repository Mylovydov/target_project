const createRowDataItem = (respondent, legend) => {
	return Object.entries(respondent).reduce((acc, [fieldName, fieldValue]) => {
		const legendField = legend[fieldName];

		if (legendField) {
			acc[legendField] = fieldValue;
			return acc;
		}
		return acc;
	}, {});
};

export default createRowDataItem;
