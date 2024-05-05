import React, { memo } from 'react';
import TargetAudienceInfoStyled, {
	InfoTextStyled,
	TargetAudienceInfoBodyStyled,
	TargetAudienceInfoHeadStyled
} from './targetAudienceInfo.styled';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { BodyItemStyled } from '../../containers/targetAudiencePage/components/targetAudienceCard/TargetAudienceCard.styled';
import RangeAttributeInfoItem from '../rangeAttributeInfoItem/RangeAttributeInfoItem';
import CategoricalAttributeInfoItem from '../categoricalAttributeInfoItem/CategoricalAttributeInfoItem';

const TargetAudienceInfo = ({
	infoTitle,
	categoricalAttr,
	rangeAttr,
	booleanAttr,
	rangeInfoTitle,
	categoricalInfoTitle,
	boolInfoTitle
}) => {
	const rangeAttrMarkup = !!rangeAttr?.length && (
		<BodyItemStyled>
			<Stack spacing={1}>
				<InfoTextStyled variant="h6" className="title">
					{rangeInfoTitle}
				</InfoTextStyled>
				<Stack direction="row" spacing={4}>
					{rangeAttr.map(attr => (
						<RangeAttributeInfoItem key={attr.name} {...attr} />
					))}
				</Stack>
			</Stack>
		</BodyItemStyled>
	);

	const categoricalAttrMarkup = !!categoricalAttr?.length && (
		<BodyItemStyled>
			<Stack spacing={1}>
				<InfoTextStyled variant="h6" className="title">
					{categoricalInfoTitle}
				</InfoTextStyled>
				<Stack spacing={1}>
					{categoricalAttr.map(attr => (
						<CategoricalAttributeInfoItem key={attr.name} {...attr} />
					))}
				</Stack>
			</Stack>
		</BodyItemStyled>
	);

	const filteredBooleanAttributes =
		!!booleanAttr?.length && booleanAttr.filter(attr => Boolean(attr.value));

	const booleanAttrMarkup = filteredBooleanAttributes && (
		<BodyItemStyled>
			<Stack spacing={1}>
				<InfoTextStyled variant="h6" className="title">
					{boolInfoTitle}
				</InfoTextStyled>
				<Stack spacing={0.5}>
					{filteredBooleanAttributes.length
						? filteredBooleanAttributes.map(attr => (
								<Typography variant="body2" key={attr.label}>
									{attr.label}
								</Typography>
							))
						: 'No selected attributes'}
				</Stack>
			</Stack>
		</BodyItemStyled>
	);

	return (
		<TargetAudienceInfoStyled>
			<TargetAudienceInfoHeadStyled>
				<Typography variant="h6">{infoTitle}</Typography>
			</TargetAudienceInfoHeadStyled>

			<TargetAudienceInfoBodyStyled>
				{rangeAttrMarkup}
				{categoricalAttrMarkup}
				{booleanAttrMarkup}
			</TargetAudienceInfoBodyStyled>
		</TargetAudienceInfoStyled>
	);
};

export default memo(TargetAudienceInfo);
