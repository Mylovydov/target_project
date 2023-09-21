import createChartDataItem from './createChartDataItem';

const getBubbleChartData = (respondentsArr) => {
	const countedChartData = respondentsArr.reduce((acc, respondent) => {
		if (acc[respondent.search_term]) {
			return {
				...acc,
				[respondent.search_term]: {
					...acc[respondent.search_term],
					count: ++acc[respondent.search_term].count
				}
			};
		}

		const newChartDataItem = createChartDataItem(respondent);

		return {
			...acc,
			[respondent.search_term]: newChartDataItem
		};
	}, {});

	return Object.values(countedChartData);
};

export default getBubbleChartData;