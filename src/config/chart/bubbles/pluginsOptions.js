import zoomOptions from './zoomOptions';
import {
	discoverInteractiveMapLegendContainerId,
	discoverInteractiveMapTitle,
	tooltipSearchTermBeforeFooter,
	tooltipSearchTermBeforeLabel,
	tooltipSearchTermBeforeTitle
} from '../../../constants';

const titleOptions = {
	display: true,
	text: discoverInteractiveMapTitle,
	padding: 15,
	font: {
		size: 18
	}
};

const fontOptions = { weight: 'bold', size: 13 };

const tooltipTitleOptions = {
	titleMarginBottom: 10,
	titleFont: fontOptions
};

const tooltipBodyOptions = {
	bodyFont: fontOptions
};

const tooltipFooterOptions = {
	footerFont: fontOptions,
	footerMarginTop: 10
};

const tooltipOptions = {
	bodyColor: '#fff',
	displayColors: false,
	padding: 12,
	...tooltipTitleOptions,
	...tooltipBodyOptions,
	...tooltipFooterOptions,
	callbacks: {
		beforeLabel: () => tooltipSearchTermBeforeLabel,
		label({ dataset }) {
			const { label } = dataset;
			return label.infoNeedLabel;
		},
		beforeTitle: () => tooltipSearchTermBeforeTitle,
		title: (TooltipItem) => {
			const { label } = TooltipItem[0].dataset;

			return label.searchTerm;
		},
		beforeFooter: () => tooltipSearchTermBeforeFooter,
		footer: (TooltipItem) => {
			const { label } = TooltipItem[0].dataset;
			return label.probability.toString();
		}
	}
};

const pluginsOptions = {
	htmlLegend: {
		containerID: discoverInteractiveMapLegendContainerId
	},
	zoom: zoomOptions,
	title: titleOptions,
	colors: {
		enabled: true
	},
	legend: {
		display: false
	},
	tooltip: tooltipOptions
};

export default pluginsOptions;