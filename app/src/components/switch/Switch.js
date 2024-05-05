import React from 'react';
import MuiSwitch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

const Switch = ({ label, defaultChecked = true, ...props }) => (
	<FormControlLabel
		control={<MuiSwitch defaultChecked={defaultChecked} {...props} />}
		label={label}
	/>
);

export default Switch;
