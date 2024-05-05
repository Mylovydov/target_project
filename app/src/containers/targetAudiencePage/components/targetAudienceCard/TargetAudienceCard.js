import React from 'react';
import DefineAudienceForm from '../defineAudienceForm/DefineAudienceForm';
import TargetAudienceInfo from '../../../../components/targetAudienceInfo/TargetAudienceInfo';
import { Card } from '../../../../components/card';

const TargetAudienceCard = ({
	infoTitle,
	rangeInfoTitle,
	categoricalInfoTitle,
	boolInfoTitle,
	categoricalAttr,
	rangeAttr,
	booleanAttr,
	...formProps
}) => (
	<Card>
		<Card.Info width="66%">
			<DefineAudienceForm
				categoricalAttr={categoricalAttr}
				rangeAttr={rangeAttr}
				booleanAttr={booleanAttr}
				{...formProps}
			/>
		</Card.Info>
		<Card.Actions>
			<TargetAudienceInfo
				infoTitle={infoTitle}
				rangeInfoTitle={rangeInfoTitle}
				categoricalInfoTitle={categoricalInfoTitle}
				boolInfoTitle={boolInfoTitle}
				categoricalAttr={categoricalAttr}
				rangeAttr={rangeAttr}
				booleanAttr={booleanAttr}
			/>
		</Card.Actions>
	</Card>
);

export default TargetAudienceCard;
