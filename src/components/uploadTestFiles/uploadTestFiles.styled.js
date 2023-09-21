import { styled } from '@mui/material';
import Box from '@mui/material/Box';

export const UploadTestFilesStyled = styled(Box, {
	name: 'UploadTestFiles',
	slot: 'Root'
})({
	display: 'flex',
	flexDirection: 'column',
	gap: '3rem'
});

export const UploadTestFilesHeadStyled = styled(Box, {
	name: 'UploadTestFilesHead',
	slot: 'Root'
})({});

export const UploadTestFilesActionStyled = styled(Box, {
	name: 'UploadTestFilesAction',
	slot: 'Root'
})({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center'
});