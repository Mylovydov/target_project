import React from 'react';
import Typography from '@mui/material/Typography';
import {
	UploadTestFilesActionStyled,
	UploadTestFilesHeadStyled,
	UploadTestFilesStyled
} from './uploadTestFiles.styled';
import Button from '../button/Button';

const UploadTestFiles = ({ title, onTestFileLoad, uploadBtnLabel }) => {
	return (
		<UploadTestFilesStyled>
			<UploadTestFilesHeadStyled>
				<Typography textAlign="center" variant="h6">
					{title}
				</Typography>
			</UploadTestFilesHeadStyled>
			<UploadTestFilesActionStyled>
				<Button onClick={onTestFileLoad} size="large" label={uploadBtnLabel} />
			</UploadTestFilesActionStyled>
		</UploadTestFilesStyled>
	);
};

export default UploadTestFiles;
