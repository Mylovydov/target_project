import calculatePercentageOf from './calculatePercentageOf';
import calculateStandardError from './calculateStandardError';

const prepareBarChartData = calculatedData => {
	const barChartData = Object.entries(calculatedData).map(
		([infoNeedLabel, data]) => {
			const { total, match, temp, infoNeedId } = data;

			return {
				label: infoNeedLabel,
				barData: calculatePercentageOf(match, total),
				standardError: +(calculateStandardError(temp) * 100).toFixed(2),
				infoNeedId
			};
		}
	);

	return [...barChartData].sort((a, b) => b.barData - a.barData);
};

export default prepareBarChartData;
