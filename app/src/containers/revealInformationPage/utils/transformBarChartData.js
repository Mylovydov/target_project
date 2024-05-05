import lineOptions from '../../../config/chart/line';

const transformData = item => {
	const { barData, standardError, infoNeedId, label } = item;
	const halfStandardError = standardError / 2;

	return {
		x: barData,
		xMax: barData + halfStandardError,
		xMin: barData - halfStandardError,
		temp: standardError,
		infoNeedId,
		infoNeed: label
	};
};

export const transformBarChartData = dataToTransform => {
	if (!dataToTransform) {
		return;
	}

	const { chartItems, lineChartData, labels } = dataToTransform;

	const barChartDataset = {
		data: chartItems.map(transformData),
		order: 2
	};

	const lineChartDataset = {
		...lineOptions,
		data: Array.from({ length: chartItems.length }).fill(
			lineChartData,
			0,
			chartItems.length
		)
	};

	return {
		labels: labels.map(label =>
			label.length > 30 ? `${label.slice(0, 30)}...` : label
		),
		datasets: [barChartDataset, lineChartDataset]
	};
};
