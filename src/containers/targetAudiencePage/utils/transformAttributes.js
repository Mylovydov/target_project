const transformAttributes = (attrs) => {
	return attrs.reduce((acc, attr) => {
		const attrType = attr.type;

		if (acc[attrType]) {
			return {
				...acc,
				[attrType]: [
					...acc[attrType],
					attr
				]
			};
		}
		return {
			...acc,
			[attrType]: [attr]
		};
	}, {});
};

export default transformAttributes;