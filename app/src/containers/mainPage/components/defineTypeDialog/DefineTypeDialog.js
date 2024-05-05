import React from 'react';
import DefineTypeDialogStyled from './defineTypeDialog.styled';
import DefineTypeForm from '../defineTypeForm/DefineTypeForm';

const DefineTypeDialog = ({ open, onClose, ...formProps }) => (
	<DefineTypeDialogStyled fullWidth open={open} onClose={onClose} maxWidth="lg">
		<DefineTypeForm onClose={onClose} {...formProps} />
	</DefineTypeDialogStyled>
);

export default DefineTypeDialog;
