import React from 'react';
import { CardActionsStyled } from '../card.styled';

const CardActions = ({ children }) => (
	<CardActionsStyled>
		{children}
	</CardActionsStyled>
);

export default CardActions;