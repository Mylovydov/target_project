import React, { useMemo } from 'react';
import { ThemeProvider } from '@mui/material';
import Zoom from '@mui/material/Zoom';
import { BrowserRouter as Router } from 'react-router-dom';
import NotificationProvider from './NotificationProvider';
import NotificationContentStyled from '../styled/notificationContent.styled';
import { closeSnackbar } from 'notistack';
import Button from '../components/button/Button';
import DeviceTypeProvider from './DeviceTypeProvider';
import { mobileDeviceResolution } from '../constants';
import CssBaseline from '@mui/material/CssBaseline';

const MainProvider = ({ children, theme }) => {
	const notificationProps = useMemo(() => ({
		anchorOrigin: { vertical: 'top', horizontal: 'center' },
		autoHideDuration: 5000,
		TransitionComponent: Zoom,
		maxSnack: 5,
		Components: {
			error: NotificationContentStyled,
			success: NotificationContentStyled
		},
		action: (id) => (
			<Button
				sx={{ color: (theme) => theme.palette.common.white }} onClick={() => closeSnackbar(id)}
				variant='text'
				label='Dismiss'
			/>
		)
	}), []);

	const deviceResolution = useMemo(() => mobileDeviceResolution, []);

	return (
		<DeviceTypeProvider resolution={deviceResolution}>
			<ThemeProvider theme={theme}>
				<CssBaseline/>
				<NotificationProvider {...notificationProps}>
					<Router>
						{children}
					</Router>
				</NotificationProvider>
			</ThemeProvider>
		</DeviceTypeProvider>
	);
};

export default MainProvider;