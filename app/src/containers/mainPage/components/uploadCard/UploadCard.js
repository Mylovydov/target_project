import React from 'react';
import { CardContent } from '@mui/material';
import { UploadCardStyled } from './uploadCard.styled';

const UploadCard = ({ children }) => {
	return (
		<UploadCardStyled elevation={3}>
			<CardContent
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					height: '100%'
				}}
			>
				{children}
			</CardContent>
		</UploadCardStyled>
	);
};

export default UploadCard;
