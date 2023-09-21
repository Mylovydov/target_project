import React from 'react';
import TextField from '@mui/material/TextField';

const TextInput = (
	{
		size = 'small',
		variant = 'outlined',
		autoFocus = false,
		autoComplete = 'off',
		...props
	}
) => (
	<TextField
		autoComplete={autoComplete}
		autoFocus={autoFocus}
		size={size}
		variant={variant}
		{...props}
	/>
);

export default TextInput;