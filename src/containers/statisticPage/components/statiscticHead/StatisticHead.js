import React from 'react';
import { StatisticHeadStyled } from './statisticHead.styled';
import Typography from '@mui/material/Typography';

const StatisticHead = ({ title }) => (
	<StatisticHeadStyled>
		<Typography textAlign='center' variant='h4' component='h1'>{title}</Typography>
	</StatisticHeadStyled>
);

export default StatisticHead;