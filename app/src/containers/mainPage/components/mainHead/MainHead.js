import React from 'react';
import { Typography } from '@mui/material';
import { MainHeadTextStyled } from './mainHead.styled';

const MainHead = ({ mainTitle, mainSubtitle, subtitle, info }) => {
	return (
		<MainHeadTextStyled>
			<Typography variant="h2" textAlign="center" component="h1">
				{mainTitle}
			</Typography>
			<Typography mt={1} variant="h6" textAlign="center">
				{mainSubtitle}
			</Typography>
			<Typography variant="body1" textAlign="center" mt={2}>
				{subtitle}
			</Typography>
			<Typography variant="subtitle1" textAlign="center" mt={6}>
				{info}
			</Typography>
		</MainHeadTextStyled>
	);
};

export default MainHead;
