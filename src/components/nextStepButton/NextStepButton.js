import React from 'react';
import Button from '../button/Button';

const NextStepButton = (props) => (
	<Button
		sx={{ minWidth: '20rem' }}
		size='large'
		{...props}
	/>
)

export default NextStepButton;