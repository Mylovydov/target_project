import React from 'react';
import LegendItemStyled, {
	BarLegendItemStyled,
	LegendItemContentStyled,
	LegendItemImgStyled,
	LineLegendItemStyled,
	StandardErrorLegendItemStyled,
	StandardErrorLegendStyled
} from './legendItem.styled';
import Typography from '@mui/material/Typography';

const legendComponents = {
	line: <LineLegendItemStyled />,
	bar: <BarLegendItemStyled />,
	standardError: (
		<StandardErrorLegendItemStyled>
			<StandardErrorLegendStyled />
		</StandardErrorLegendItemStyled>
	)
};

const LegendItem = ({ labelComponent, label }) => (
	<LegendItemStyled
		direction="row"
		spacing={1}
		alignItems="center"
		justifyContent="center"
	>
		<LegendItemImgStyled>
			{legendComponents[labelComponent]}
		</LegendItemImgStyled>
		<LegendItemContentStyled>
			<Typography variant="caption" noWrap>
				{label}
			</Typography>
		</LegendItemContentStyled>
	</LegendItemStyled>
);

export default LegendItem;
