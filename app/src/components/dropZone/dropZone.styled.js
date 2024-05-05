import { alpha, styled } from '@mui/material';
import Box from '@mui/material/Box';

export const DropZoneStyled = styled(Box, {
	name: 'DropZone',
	slot: 'Root'
})({
	display: 'flex',
	flexDirection: 'column',
	gap: '2rem',
	width: '100%'
});

export const DropZoneUploadActionStyled = styled(Box, {
	name: 'DropZoneUploadAction',
	slot: 'Root'
})(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	padding: '4rem',
	borderRadius: '.5rem',
	borderWidth: '2px',
	borderStyle: 'dashed',
	outline: 'none',
	cursor: 'pointer',
	backgroundColor: alpha(theme.palette.primary.light, 0.05),
	borderColor: theme.palette.grey[400],
	transition: `
		background-color ${theme.transitions.duration.short}ms ${theme.transitions.easing.easeIn},
		border ${theme.transitions.duration.short}ms ${theme.transitions.easing.easeIn}
		`,
	'&:hover, &:focus': {
		backgroundColor: alpha(theme.palette.primary.light, 0.1),
		borderColor: theme.palette.primary.main
	}
}));
