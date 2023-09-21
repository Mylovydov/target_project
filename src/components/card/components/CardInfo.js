import React from 'react';
import { CardInfoStyled } from '../card.styled';

const CardInfo = ({ children, width = '40rem' }) => (
	<CardInfoStyled width={width}>
		{children}
	</CardInfoStyled>
);

export default CardInfo;