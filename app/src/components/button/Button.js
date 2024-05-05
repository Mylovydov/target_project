import React from 'react';
import MuiButton from '@mui/material/Button';

const Button = ({ variant = 'outlined', label, type = 'submit', ...props }) => (
	<MuiButton variant={variant} type={type} {...props}>
		{label}
	</MuiButton>
);
export default Button;
