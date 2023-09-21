import { styled } from '@mui/material';
import { MaterialDesignContent } from 'notistack';

const NotificationContentStyled = styled(MaterialDesignContent)(({ theme }) => ({
	'&.notistack-MuiContent-success': {
		backgroundColor: theme.palette.success.main,
		...(theme.typography.subtitle2)
	},
	'&.notistack-MuiContent-error': {
		backgroundColor: theme.palette.error.main,
		...(theme.typography.subtitle2)
	}
}));

export default NotificationContentStyled;