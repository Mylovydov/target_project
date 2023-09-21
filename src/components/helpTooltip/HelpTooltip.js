import React from 'react';
import Tooltip from '../tooltip/Tooltip';
import HelpIcon from '@mui/icons-material/Help';

const HelpTooltip = ({ placement = 'right-start', arrow = true, ...props }) => {
	return (
		<Tooltip
			disableFocusListener
			{...{ placement, arrow }}
			{...props}
		>
			<HelpIcon fontSize='small' sx={{
				color: (theme) => theme.palette.grey[500],
				cursor: 'help'
			}}/>
		</Tooltip>
	);
};

export default HelpTooltip;