import { audienceChartTitle, tooltipStandardErrorTitle } from '../../../constants';

const pluginsOptions = {
	legend: {
		display: false,
		onClick: false
	},
	title: {
		display: true,
		text: audienceChartTitle
	},
	tooltip: {
		xAlign: 'left',
		yAlign: 'center',
		callbacks: {
			label: (context) => `${context.formattedValue}%`,
			beforeFooter: () => tooltipStandardErrorTitle,
			footer: (context) => {
				const { dataIndex, dataset } = context[0];
				return `${dataset.data[dataIndex].temp}%`;
			}
		},
		displayColors: false
	}
};

export default pluginsOptions;