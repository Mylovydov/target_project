import React from 'react';
import { Bubble } from 'react-chartjs-2';
import options from '../../config/chart/bubbles';
import Box from '@mui/material/Box';
import pluginsOptions from '../../config/chart/bubbles/pluginsOptions';
import zoomOptions from '../../config/chart/bubbles/zoomOptions';
import externalPlugins from '../../config/chart/bubbles/externalPlugins';
import {
	discoverInteractiveMapLegendContainerId,
	discoverInteractiveMapSubtitle
} from '../../constants';
import BubblesLegend from './components/BubblesLegend';
import DiscoverBubblesStyled, {
	DiscoverBubblesChartStyled,
	DiscoverBubblesLegendStyled
} from './discoverBubblesChart.styled';
import Switch from '../switch/Switch';
import Stack from '@mui/material/Stack';

const DiscoverBubblesChart = ({
	chartData,
	chartAxiosValues,
	onToggleOriginalBubblesSize,
	isOriginalBubblesSize
}) => (
	<DiscoverBubblesStyled>
		<DiscoverBubblesChartStyled>
			<Bubble
				style={{
					width: '100%',
					height: '800px'
				}}
				data={chartData}
				plugins={externalPlugins}
				options={{
					...options,
					plugins: {
						...pluginsOptions,
						zoom: {
							...zoomOptions,
							limits: chartAxiosValues
						}
					},
					scales: chartAxiosValues
				}}
			/>
		</DiscoverBubblesChartStyled>
		<DiscoverBubblesLegendStyled spacing={2}>
			<BubblesLegend text={discoverInteractiveMapSubtitle} />
			<Box id={discoverInteractiveMapLegendContainerId} />
			<Stack direction="row" justifyContent="center">
				<Switch
					onChange={onToggleOriginalBubblesSize}
					value={isOriginalBubblesSize}
					label="Enable unified bubble size"
				/>
			</Stack>
		</DiscoverBubblesLegendStyled>
	</DiscoverBubblesStyled>
);

export default DiscoverBubblesChart;
