import React from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import InfoSpace from '../../../../components/infoSpace/InfoSpace';

const DownloadFile = ({ title, json }) => (
	<InfoSpace spacing='.5rem' alignItems='center'>
		<Typography variant='body2'>{title}</Typography>
		<Stack direction='row' spacing={2}>
			<Link download href={json.href} target='_blank' underline='hover'>{json.label}</Link>
		</Stack>
	</InfoSpace>
);

export default DownloadFile;