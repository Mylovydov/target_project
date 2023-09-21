import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { InfoTextStyled } from '../targetAudienceInfo/targetAudienceInfo.styled';

const RangeAttributeInfoItem = ({ label, value }) => {
	return (
		<Stack spacing='0.5rem'>
			<InfoTextStyled variant='h6' className='label'>
				{label}:
			</InfoTextStyled>
			<Typography noWrap variant='body2'>
				{value.join(' - ')}
			</Typography>
		</Stack>
	);
};

export default RangeAttributeInfoItem;