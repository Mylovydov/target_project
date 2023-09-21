import React from 'react';
import ChartLegendStyled, { ChartLegendItemStyled } from './chartLegend.styled';
import LegendItem from '../legendItem/LegendItem';

const ChartLegend = ({ items }) => {
	const legendMarkup = items.map(({ label, labelComponent }) => (
		<ChartLegendItemStyled key={label}>
			<LegendItem labelComponent={labelComponent} label={label}/>
		</ChartLegendItemStyled>
	));

	return (
		<ChartLegendStyled>
			{legendMarkup}
		</ChartLegendStyled>
	);
};

export default ChartLegend;