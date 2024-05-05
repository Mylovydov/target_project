import { MAX_RAD } from '../../../constants';
import { getColorGenerator } from '../../../config/chart/bubbles/helpers';
import { defaultUploadDataFields } from '../../../config/dexie';

const colorGenerator = getColorGenerator();

export const transformChartData = (
	dataToTransform,
	isOriginalSize,
	selectedOptions
) => {
	if (!dataToTransform) {
		return;
	}

	const optionsHasValue = Object.values(selectedOptions).filter(Boolean).length;
	const { infoNeed, needId } = defaultUploadDataFields;

	let datasets = dataToTransform.map(item => {
		const {
			count = 1,
			infoNeedId,
			searchTerm,
			infoNeedLabel,
			needProbability,
			axiosX,
			axiosY
		} = item;

		const increasedCount = count * 5;
		const radius = Math.min(increasedCount, MAX_RAD);
		const { backgroundColor, borderColor } = colorGenerator(infoNeedId);

		const isSelectedItem =
			selectedOptions[infoNeed] === infoNeedLabel &&
			+selectedOptions[needId] === infoNeedId;

		const bubbleStyle = optionsHasValue
			? {
					backgroundColor: isSelectedItem
						? backgroundColor
						: 'rgba(227,227,227,0.5)',
					borderColor: isSelectedItem ? borderColor : 'rgba(117,117,117,0.5)'
				}
			: {
					backgroundColor,
					borderColor
				};

		return {
			label: {
				searchTerm,
				infoNeedLabel,
				probability: needProbability,
				infoNeedId
			},
			data: [
				{
					x: axiosX,
					y: axiosY,
					r: isOriginalSize ? radius : 3
				}
			],
			isSelectedItem: +isSelectedItem,
			...bubbleStyle
		};
	});

	if (optionsHasValue) {
		datasets = datasets.sort((a, b) => b.isSelectedItem - a.isSelectedItem);
	}

	return {
		datasets
	};
};
