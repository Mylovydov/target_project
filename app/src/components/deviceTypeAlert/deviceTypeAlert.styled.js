import { styled } from '@mui/material';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';

const DeviceTypeAlertWrapperStyled = styled(Box, {
	name: 'DeviceTypeAlertWrapper',
	slot: 'Root'
})({
	width: '100%',
	height: '100vh',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center'
});

export const DeviceTypeAlertStyled = styled(Alert, {
	name: 'DeviceTypeAlert',
	slot: 'Root'
})({
	display: 'flex',
	alignItems: 'center'
});

export default DeviceTypeAlertWrapperStyled;
