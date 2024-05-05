import { styled } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Stack from '@mui/material/Stack';

import { Link } from 'react-router-dom';

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

export const HeaderNavStyled = styled(Stack, {
	name: 'HeaderNav',
	slot: 'Root'
})({
	display: 'flex',
	alignItems: 'center'
});

export const HeaderActionsStyled = styled(Stack, {
	name: 'HeaderActions',
	slot: 'Root'
})({});

// export const NavItemStyled = styled(MenuItem, {
// 	name: 'NavItem',
// 	slot: 'Root'
// })({
// 	padding: 0
// });

export const NavLinkStyled = styled(Link, {
	name: 'NavLink',
	slot: 'Root'
})(({ theme, active }) => ({
	padding: '1rem',
	textDecoration: 'none',
	fontWeight: active ? 700 : 500,
	color: active ? theme.palette.common.white : theme.palette.grey[200],
	position: 'relative',

	'&:not(:last-of-type)::after': {
		content: "'>'",
		paddingLeft: '1.5rem'
	}
}));

export default HeaderStyled;
