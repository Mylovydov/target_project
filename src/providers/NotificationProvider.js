import React, { createContext, useCallback, useMemo } from 'react';
import { SnackbarProvider, useSnackbar } from 'notistack';

export const NotificationContext = createContext({});

const NotificationBaseProvider = ({ children }) => {
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	const open = useCallback(({ key, message, ...opt }) => {
		enqueueSnackbar(message, {
			key,
			...opt
		});
	}, [enqueueSnackbar]);

	const close = useCallback((key) => {
		closeSnackbar(key);
	}, [closeSnackbar]);

	const value = useMemo(() => ({
		open,
		close
	}), [open, close]);

	return (
		<NotificationContext.Provider value={value}>
			{children}
		</NotificationContext.Provider>
	);
};

const NotificationProvider = ({ children, ...props }) => (
	<SnackbarProvider {...props}>
		<NotificationBaseProvider>
			{children}
		</NotificationBaseProvider>
	</SnackbarProvider>
);

export default NotificationProvider;