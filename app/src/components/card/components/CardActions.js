import React from 'react';
import { CardActionsStyled } from '../card.styled';

const CardActions = ({ children, padding = '2rem' }) => (
	<CardActionsStyled padding={padding}>{children}</CardActionsStyled>
);

export default CardActions;
