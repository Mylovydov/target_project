import { Stack, Typography } from '@mui/material';
import { InfoTextStyled } from '../targetAudienceInfo/targetAudienceInfo.styled';

const CategoricalAttributeInfoItem = ({ value, label }) => {
	const valuesMarkup = value.length ? (
		<Typography variant="body2">{value.join('; ')}</Typography>
	) : (
		'No selected attributes'
	);

	return (
		<Stack>
			<InfoTextStyled variant="h6" className="label">
				{label}:
			</InfoTextStyled>
			<Stack spacing={1}>{valuesMarkup}</Stack>
		</Stack>
	);
};

export default CategoricalAttributeInfoItem;
