const customDoubleClick = {
	id: 'customDoubleClick',
	afterEvent(chart, args) {
		const event = args.event;

		if (event.type !== 'dblclick' || args.replay) {
			return;
		}

		let centerX = 0;
		let centerY = 0;
		const visibleDatasetCount = chart.getVisibleDatasetCount();
		for (let i = 0; i < visibleDatasetCount; i++) {
			const meta = chart.getDatasetMeta(i);
			const center = meta.data[0].getCenterPoint();
			centerX += center.x;
			centerY += center.y;
		}

		centerX /= visibleDatasetCount;
		centerY /= visibleDatasetCount;
		chart.pan({
			x: chart.chartArea.width / 2 - centerX,
			y: chart.chartArea.height / 2 - centerY
		});

		chart.update();
		chart.resetZoom();
	}
};

export default customDoubleClick;
