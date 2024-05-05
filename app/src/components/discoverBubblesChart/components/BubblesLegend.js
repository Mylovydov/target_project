import React from 'react';
import InfoSpace from '../../infoSpace/InfoSpace';
import Typography from '@mui/material/Typography';

const BubblesLegend = ({ text }) => (
	<InfoSpace>
		<Typography
			textAlign="center"
			variant="body"
			sx={{ color: theme => theme.palette.warning.dark }}
		>
			{text}
		</Typography>
	</InfoSpace>
);

export default BubblesLegend;
