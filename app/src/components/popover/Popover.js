import React from 'react';
import MuiPopover from '@mui/material/Popover';

const Popover = props => {
	const {
		anchorEl,
		children,
		anchorOrigin = {
			vertical: 'center',
			horizontal: 'right'
		},
		transformOrigin = {
			vertical: 'center',
			horizontal: 'left'
		},
		...restProps
	} = props;

	return (
		<MuiPopover
			anchorEl={anchorEl}
			anchorOrigin={anchorOrigin}
			transformOrigin={transformOrigin}
			{...restProps}
		>
			{children}
		</MuiPopover>
	);
};

export default Popover;
