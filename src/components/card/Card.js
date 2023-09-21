import React from 'react';
import Paper from '@mui/material/Paper';
import { CardStyled } from './card.styled';
import CardActions from './components/CardActions';
import CardInfo from './components/CardInfo';

const Card = ({ children, elevation = 2, paperStyleProps, cardStyleProps }) => (
	<Paper elevation={elevation} sx={paperStyleProps}>
		<CardStyled direction='row' justifyContent='space-between' sx={cardStyleProps} >
			{children}
		</CardStyled>
	</Paper>
);

Card.Info = CardInfo;
Card.Actions = CardActions;

export default Card;