import React, { useEffect } from 'react';
import { DropZoneStyled, DropZoneUploadActionStyled } from './dropZone.styled';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import useDropZone from '../../containers/mainPage/hooks/useDropZone';
import useNotification from '../../hooks/useNotification';
import Button from '../button/Button';

const DropZone = ({ onDropAccepted, actionLabel, label, description }) => {
	const { getRootProps, getInputProps, isDragActive, fileRejections, open } =
		useDropZone({ onDropAccepted });

	const { open: openNotification } = useNotification();

	const contentMarkup = (
		<Box>
			<Typography
				variant="subtitle1"
				textAlign="center"
				sx={{ color: 'primary.main' }}
			>
				{isDragActive ? actionLabel : label}
			</Typography>
			<Typography
				textAlign="center"
				sx={{ color: 'text.secondary' }}
				mt={1}
				variant="body2"
			>
				{description}
			</Typography>
		</Box>
	);

	useEffect(() => {
		if (fileRejections.length) {
			fileRejections[0]?.errors
				?.filter(err => err.code !== 'file-invalid-type')
				.forEach(e =>
					openNotification({ message: e.message, variant: 'error' })
				);
		}
	}, [fileRejections, openNotification]);

	return (
		<DropZoneStyled>
			<DropZoneUploadActionStyled {...getRootProps()}>
				<input {...getInputProps()} />
				{contentMarkup}
			</DropZoneUploadActionStyled>
			<Stack direction="row" justifyContent="center">
				<Button
					size="large"
					sx={{ maxWidth: '30rem' }}
					onClick={open}
					label="Upload file"
				/>
			</Stack>
		</DropZoneStyled>
	);
};

export default DropZone;
