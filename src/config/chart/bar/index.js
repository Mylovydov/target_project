import {
	BarController,
	BarElement,
	BubbleController,
	CategoryScale,
	Chart as ChartJS,
	Legend,
	LinearScale,
	LineController,
	LineElement,
	PointElement,
	SubTitle,
	Title,
	Tooltip
} from 'chart.js';
import { BarWithErrorBar, BarWithErrorBarsController } from 'chartjs-chart-error-bars';

import pluginsOptions from './pluginsOptions';
import scalesOptions from './scalesOptions';
import zoomPlugin from 'chartjs-plugin-zoom';

ChartJS.register(
	CategoryScale,
	LinearScale,
	LineElement,
	BarElement,
	Title,
	Tooltip,
	Legend,
	LineController,
	BarController,
	BarWithErrorBarsController,
	BarWithErrorBar,

	PointElement, zoomPlugin, SubTitle, BubbleController
);

const options = {
	type: 'barWithErrorBars',
	aspectRatio: 1,
	indexAxis: 'y',
	backgroundColor: 'rgb(154,208,245)',
	responsive: true,
	grouped: false,
	plugins: {
		...pluginsOptions,
	},
	scales: scalesOptions,
};

export default options;