import React from 'react';
import RevealBarChart from '../../../../components/revealBarChart/RevealBarChart';
import TargetAudienceInfo from '../../../../components/targetAudienceInfo/TargetAudienceInfo';
import Card from '../../../../components/card/Card';

const RevealCard = ({ barChartData, onBarItemClick, ...infoProps }) => (
	<Card>
		<Card.Info>
			<TargetAudienceInfo {...infoProps} />
		</Card.Info>
		<Card.Actions>
			<RevealBarChart
				onBarItemClick={onBarItemClick}
				barChartData={barChartData}
			/>
		</Card.Actions>
	</Card>
);

export default RevealCard;