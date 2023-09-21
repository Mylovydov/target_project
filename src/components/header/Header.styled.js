import { styled } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import MenuItem from '@mui/material/MenuItem';

import { NavLink } from 'react-router-dom';

const HeaderStyled = styled(AppBar, {
	name: 'Header',
	slot: 'Root'
})({
	padding: 0
});

export const HeaderBodyStyled = styled(Toolbar, {
	name: 'HeaderBody',
	slot: 'Root'
})({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center'
});


export const HeaderNavStyled = styled(Box, {
	name: 'HeaderNav',
	slot: 'Root'
})({
});

export const HeaderActionsStyled = styled(Stack, {
	name: 'HeaderActions',
	slot: 'Root'
})({
});

export const NavItemStyled = styled(MenuItem, {
	name: 'NavItem',
	slot: 'Root'
})({
	padding: 0
});

export const NavLinkStyled = styled(NavLink, {
	name: 'NavLink',
	slot: 'Root'
})(({ theme }) => ({
	padding: '1rem 1.5rem',
	textDecoration: 'none',
	color: theme.palette.text.primary,
	width: '100%',
	display: 'flex',
	alignItems: 'center'
}));

export default HeaderStyled;