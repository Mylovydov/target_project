import { styled } from '@mui/material';
import Dialog from '@mui/material/Dialog';

export const DefineTypeDialogStyled = styled(Dialog, {
	name: 'DefineTypeDialog',
	slot: 'Root'
})({
	overflowY: 'initial'
});

export default DefineTypeDialogStyled;