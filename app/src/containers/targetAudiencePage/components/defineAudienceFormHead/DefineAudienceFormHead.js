import Typography from '@mui/material/Typography';
import { memo } from 'react';
import DefineAudienceFormHeadStyled, {
	DefineAudienceFormHeadSubtitleStyled,
	DefineAudienceFormHeadTitleStyled
} from './defineAudienceFormHead.styled';
import HelpTooltip from '../../../../components/helpTooltip/HelpTooltip';
import { respondentAttributesHelperText } from '../../../../constants';

const DefineAudienceFormHead = ({ title, subtitle }) => (
	<DefineAudienceFormHeadStyled>
		<DefineAudienceFormHeadTitleStyled
			direction="row"
			spacing={1}
			alignItems="center"
		>
			<Typography variant="h6">{title}</Typography>
			<HelpTooltip title={respondentAttributesHelperText} />
		</DefineAudienceFormHeadTitleStyled>
		<DefineAudienceFormHeadSubtitleStyled>
			<Typography variant="body1">{subtitle}</Typography>
		</DefineAudienceFormHeadSubtitleStyled>
	</DefineAudienceFormHeadStyled>
);

export default memo(DefineAudienceFormHead);
