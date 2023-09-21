import { alpha, styled } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Stack from '@mui/material/Stack';

const TableToolbarStyled = styled(Toolbar, {
	name: 'TableToolbar',
	slot: 'Root'
})(({ theme, ...rest }) => ({
	backgroundColor: rest.selected
		? alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity)
		: theme.palette.grey[100],
	justifyContent: 'space-between',
}));

export const TableToolbarLabelStyled = styled(Stack, {
	name: 'TableToolbarLabel',
	slot: 'Root'
})({
	alignItems: 'center',
});

export const TableToolbarActionsStyled = styled(Stack, {
	name: 'TableToolbarActions',
	slot: 'Root'
})({
	alignItems: 'center',
	flexWrap: 'wrap'
});

export default TableToolbarStyled;