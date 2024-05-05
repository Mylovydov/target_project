import React from 'react';
import InfoSpaceStyled from './infoSpace.styled';

const InfoSpace = ({ children, ...props }) => (
	<InfoSpaceStyled {...props}>{children}</InfoSpaceStyled>
);

export default InfoSpace;
