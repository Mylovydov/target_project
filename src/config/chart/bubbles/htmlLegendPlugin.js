import { transformLegendItems } from './helpers';

const getOrCreateLegendList = (chart, id) => {
	const legendContainer = document.getElementById(id);
	let listContainer = legendContainer.querySelector('ul');

	if (!listContainer) {
		listContainer = document.createElement('ul');
		listContainer.style.display = 'flex';
		listContainer.style.flexDirection = 'row';
		listContainer.style.flexWrap = 'wrap';
		listContainer.style.rowGap = '0.6rem';
		listContainer.style.columnGap = '0.5rem';
		listContainer.style.margin = 0;
		listContainer.style.padding = 0;

		legendContainer.appendChild(listContainer);
	}

	return listContainer;
};

const htmlLegendPlugin = {
	id: 'htmlLegend',
	afterUpdate(chart, args, options) {
		const ul = getOrCreateLegendList(chart, options.containerID);

		while (ul.firstChild) {
			ul.firstChild.remove();
		}

		const items = chart.options.plugins.legend.labels.generateLabels(chart);

		const legendItems = transformLegendItems(items);
		const legendItemsLength = legendItems.length;

		legendItems?.forEach((item) => {
			const li = document.createElement('li');
			li.style.alignItems = 'center';
			li.style.cursor = legendItemsLength > 1 ? 'pointer' : '';
			li.style.display = 'flex';
			li.style.flexDirection = 'row';
			li.style.gap = '0.5rem';

			if (legendItemsLength > 1) {
				li.onclick = () => {
					item?.datasetIndexes?.forEach(index => chart.setDatasetVisibility(index, !chart.isDatasetVisible(index)));
					chart.update();
				};
			}

			// Color box
			const boxSpan = document.createElement('span');
			boxSpan.style.background = item.fillStyle;
			boxSpan.style.borderColor = item.strokeStyle;
			boxSpan.style.borderWidth = item.lineWidth + 'px';
			boxSpan.style.display = 'inline-block';
			boxSpan.style.height = '1.5rem';
			boxSpan.style.width = '1.5rem';

			// Text
			const textContainer = document.createElement('p');
			textContainer.style.color = item.fontColor;
			textContainer.style.margin = 0;
			textContainer.style.padding = 0;
			textContainer.style.fontSize = 1.2 + 'rem';
			textContainer.style.textDecoration = item.hidden ? 'line-through' : '';
			const text = document.createTextNode(item.text.infoNeedLabel);
			textContainer.appendChild(text);

			li.appendChild(boxSpan);
			li.appendChild(textContainer);
			ul.appendChild(li);
		});
	}
};

export default htmlLegendPlugin;