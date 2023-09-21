import { styled } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const TargetTooltipStyled = styled(Box, {
	name: 'TargetTooltip',
	slot: 'Root'
})({});

export const TargetTooltipHeadStyled = styled(Box, {
	name: 'TargetTooltipHead',
	slot: 'Root'
})({
	padding: '1rem 1rem 0'
});

export const TargetTooltipBodyStyled = styled(Box, {
	name: 'TargetTooltipBody',
	slot: 'Root'
})({});

export const TargetTooltipTextStyled = styled(Typography, {
	name: 'TargetTooltipText',
	slot: 'Root'
})(({ theme, ...rest }) => ({
	...(rest.variant === 'h6' && {
		...theme.typography.h6,
		'&.headingLg': {
			fontSize: '1.8rem'
		},
		'&.heading': {
			fontSize: '1.6rem'
		}
	})
}));

export default TargetTooltipStyled;