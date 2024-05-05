const transformAudienceFilter = (filterItems = []) => {
	return filterItems.reduce((acc, filter) => {
		const { type } = filter;

		if (acc[type]) {
			return { ...acc, [type]: [...acc[type], filter] };
		}

		return { ...acc, [type]: [filter] };
	}, {});
};

export default transformAudienceFilter;
