import React from 'react';
import Card from '../../../../components/card/Card';
import TargetAudienceInfo from '../../../../components/targetAudienceInfo/TargetAudienceInfo';
import BuildSet from '../buildSet/BuildSet';

const BuildSetCard = ({
	infoTitle,
	categoricalAttr,
	rangeAttr,
	booleanAttr,
	rangeInfoTitle,
	categoricalInfoTitle,
	boolInfoTitle,
	...buildSetProps
}) => (
	<Card
		cardStyleProps={{
			flexGrow: 1
		}}
		paperStyleProps={{
			minHeight: '82rem',
			display: 'flex',
			flexDirection: 'column'
		}}
	>
		<Card.Info>
			<TargetAudienceInfo
				{...{
					infoTitle,
					categoricalAttr,
					rangeAttr,
					booleanAttr,
					rangeInfoTitle,
					categoricalInfoTitle,
					boolInfoTitle
				}}
			/>
		</Card.Info>
		<Card.Actions>
			<BuildSet {...buildSetProps} />
		</Card.Actions>
	</Card>
);

export default BuildSetCard;
