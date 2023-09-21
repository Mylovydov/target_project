import React from 'react';
import { AppLayoutBodyStyled, AppLayoutStyled } from './appLayout.styled';
import { Outlet } from 'react-router-dom';
import Header from '../header/Header';
import Container from '@mui/material/Container';

const AppLayout = () => {
	return (
		<AppLayoutStyled>
			<Header/>
			<AppLayoutBodyStyled>
				<Container maxWidth='xl'>
					<Outlet/>
				</Container>
			</AppLayoutBodyStyled>
		</AppLayoutStyled>
	);
};

export default AppLayout;