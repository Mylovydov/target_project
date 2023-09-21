import { styled } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const DefineAudienceFormStyled = styled(Box, {
	name: 'DefineAudienceForm',
	slot: 'Root'
})({
	display: 'flex',
	flexDirection: 'column',
	height: '100%'
});

export const FormTextStyled = styled(Typography, {
	name: 'FormText',
	slot: 'Root'
})(({ theme, ...rest }) => ({
	...(rest.variant === 'h6' && {
		...theme.typography.h6,
		'&.label': {
			fontWeight: 'medium',
			fontSize: '1.5rem'
		}
	})
}));

export const DefineAudienceFormHeadStyled = styled(Box, {
	name: 'DefineAudienceFormHead',
	slot: 'Root'
})(({ theme }) => ({
	borderBottom: `1px solid ${theme.palette.grey[300]}`,
	padding: '3rem'
}));

export const DefineAudienceFormBodyStyled = styled(Stack, {
	name: 'DefineAudienceFormBody',
	slot: 'Root'
})({
	flex: '1 1 auto',
	padding: '3rem'
});

export const DefineAudienceFormFooterStyled = styled(Box, {
	name: 'DefineAudienceFormFooter',
	slot: 'Root'
})(({ theme }) => ({
	borderTop: `1px solid ${theme.palette.grey[300]}`,
	padding: '3rem 3rem'
}));

export default DefineAudienceFormStyled;