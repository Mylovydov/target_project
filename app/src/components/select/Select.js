import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const Select = ({ options = [], label, emptyItem = true, ...props }) => {
	return (
		<TextField fullWidth select autoComplete="off" label={label} {...props}>
			{emptyItem && (
				<MenuItem value={''}>
					<Typography sx={{ color: theme => theme.palette.grey[500] }}>
						All
					</Typography>
				</MenuItem>
			)}
			{options.map(option => (
				<MenuItem key={option} value={option}>
					{option}
				</MenuItem>
			))}
		</TextField>
	);
};

export default Select;
