import React from 'react';
import Typography from '@mui/material/Typography';
import DeviceTypeAlertWrapperStyled, { DeviceTypeAlertStyled } from './deviceTypeAlert.styled';

const DeviceTypeAlert = ({ message }) => (
	<DeviceTypeAlertWrapperStyled>
		<DeviceTypeAlertStyled severity='error'>
			<Typography variant='h4'>
				{message}
			</Typography>
		</DeviceTypeAlertStyled>
	</DeviceTypeAlertWrapperStyled>
);

export default DeviceTypeAlert;