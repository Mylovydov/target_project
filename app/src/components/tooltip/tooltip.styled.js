import { styled } from '@mui/material';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

const TooltipStyled = styled(({ className, ...props }) => (
	<Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
	[`& .${tooltipClasses.tooltip}`]: {
		backgroundColor: theme.palette.common.white,
		color: theme.palette.text.primary,
		boxShadow: theme.shadows[2],
		fontSize: '1.4rem',
		fontWeight: 'normal'
	},
	[`& .${tooltipClasses.arrow}`]: {
		color: theme.palette.common.white
	}
}));

export default TooltipStyled;
