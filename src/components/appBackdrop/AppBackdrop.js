import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const AppBackdrop = (props) => (
	<Backdrop
		sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
		{...props}
	>
		<CircularProgress color='inherit'/>
	</Backdrop>
);

export default AppBackdrop;