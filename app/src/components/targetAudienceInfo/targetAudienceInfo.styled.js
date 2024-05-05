import { styled } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const TargetAudienceInfoStyled = styled(Stack, {
	name: 'DiscoverActions',
	slot: 'Root'
})({
	display: 'flex',
	flexDirection: 'column'
});

export const TargetAudienceInfoHeadStyled = styled(Stack, {
	name: 'TargetAudienceInfoHead',
	slot: 'Root'
})({
	padding: '3rem 3rem 1rem'
});

export const TargetAudienceInfoBodyStyled = styled(Stack, {
	name: 'TargetAudienceInfoBody',
	slot: 'Root'
})({
	padding: '1rem 3rem 3rem'
});

export const InfoTextStyled = styled(Typography, {
	name: 'FormText',
	slot: 'Root'
})(({ theme, ...rest }) => ({
	...(rest.variant === 'h6' && {
		...theme.typography.h6,
		'&.title': {
			fontWeight: 'medium',
			fontSize: '1.7rem'
		},
		'&.label': {
			fontWeight: 'medium',
			fontSize: '1.5rem'
		}
	})
}));

export default TargetAudienceInfoStyled;
