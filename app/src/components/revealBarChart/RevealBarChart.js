import React, { memo } from 'react';
import { Chart as ChartBar } from 'react-chartjs-2';
import options from '../../config/chart/bar';

const RevealBarChart = ({ barChartData, onBarItemClick }) => {
	function onHandleBarItemClick(e, item) {
		if (!(item.length && onBarItemClick)) {
			return;
		}

		const dataIndex = item[0].index;
		const { infoNeedId, infoNeed } = this.data.datasets[0].data[dataIndex];
		onBarItemClick({ infoNeedId: infoNeedId.toString(), infoNeed });
	}

	return (
		<ChartBar
			type="barWithErrorBars"
			style={{
				width: '100%',
				height: '700px'
			}}
			data={barChartData}
			options={{
				...options,
				onClick: onHandleBarItemClick
			}}
		/>
	);
};

export default memo(RevealBarChart);
