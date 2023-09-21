import React, { useCallback, useState } from 'react';
import { MainPageBodyStyled, MainPageHeadStyled, MainPageStyled } from './mainPage.styled';
import { Stack } from '@mui/material';
import MainHead from './components/mainHead/MainHead';
import DropZone from '../../components/dropZone/DropZone';
import UploadTestFiles from '../../components/uploadTestFiles/UploadTestFiles';
import AppBackdrop from '../../components/appBackdrop/AppBackdrop';
import UploadCard from './components/uploadCard/UploadCard';
import validateFile from './utils/validateFile';
import useNotification from '../../hooks/useNotification';
import DownloadFile from './components/downloadFile/DownloadFile';
import { useNavigate } from 'react-router-dom';
import { defineTypeDialogSubtitle, defineTypeDialogTitle, localStorageModeKey, routes } from '../../constants';
import useIndexedDBService from '../../services/db/indexedDBService';
import readJsonFile from './utils/readFile';
import DefineTypeDialog from './components/defineTypeDialog/DefineTypeDialog';
import getFieldsForTyping from './utils/getUploadedFields';
import transformTypedFields from './utils/transformTypedFields';
import useWarnUserAboutDBCreation from './utils/warnUserAboutDBCreation';
import useLocalStorage from '../../hooks/useLocalStorage';

const MainPageContainer = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [uploadedRespondents, setUploadedRespondents] = useState(null);
	const [uploadedFields, setUploadedFields] = useState(null);
	const { userAgreesDBCleanup } = useWarnUserAboutDBCreation();
	const [_, setAppMode] = useLocalStorage(localStorageModeKey, true);

	const navigate = useNavigate();
	const { setUploadDataToDb, clearData } = useIndexedDBService();

	const { open } = useNotification();

	const onCloseDialog = () => {
		setUploadedFields(() => null);
	};

	const onUploadRespondentsToDB = (fieldsInfo) => {
		setIsLoading(() => true);
		setUploadDataToDb(uploadedRespondents, fieldsInfo)
			.then(() => {
				setAppMode(false);
				open({ message: 'File successfully download', variant: 'success' });
				navigate(routes.statistic);
			})
			.catch(err => open({ message: err.message, variant: 'error' }))
			.finally(() => setIsLoading(() => false));
	};

	const onDropAccepted = useCallback(async (acceptedFiles) => {
		try {
			const file = acceptedFiles[0];

			if (!file) {
				return;
			}

			const isDBCanCreated = await userAgreesDBCleanup();
			if (!isDBCanCreated) {
				return;
			}

			setIsLoading(true);

			await clearData();
			const respondents = await readJsonFile(file);
			const validateErrorMessage = validateFile(respondents);

			setIsLoading(false);

			if (validateErrorMessage) {
				return open({ message: validateErrorMessage, variant: 'error' });
			}

			const uploadedFields = getFieldsForTyping(respondents);
			setUploadedRespondents(() => respondents);
			setUploadedFields(() => uploadedFields);
		} catch (err) {
			setIsLoading(false);
			open({ message: err.message, variant: 'error' });
		}
	}, [setIsLoading, open, userAgreesDBCleanup, clearData]);

	const onTestFileLoad = useCallback(async () => {
		try {
			const isDBCanCreated = await userAgreesDBCleanup();
			if (!isDBCanCreated) {
				return;
			}

			setIsLoading(true);
			await clearData();

			const { default: demoRespondents } = await import((`../../assets/testdata_prepared.json`));
			const uploadedFields = getFieldsForTyping(demoRespondents);
			const fieldsInfo = transformTypedFields(uploadedFields);

			await setUploadDataToDb(demoRespondents, fieldsInfo);

			setAppMode(true);
			open({ message: 'File successfully download', variant: 'success' });
			navigate(routes.statistic);
		} catch (err) {
			open({ message: err.message, variant: 'error' });
		} finally {
			setIsLoading(() => false);
		}
	}, [open, navigate, setUploadDataToDb, userAgreesDBCleanup, clearData, setAppMode]);

	const spinner = isLoading && <AppBackdrop open={!!isLoading}/>;

	return (
		<MainPageStyled>
			<DefineTypeDialog
				open={!!uploadedFields}
				formFields={uploadedFields}
				onClose={onCloseDialog}
				onSubmit={onUploadRespondentsToDB}
				uploadBtnLabel='Upload data'
				cancelBtnLabel='Cancel'
				title={defineTypeDialogTitle}
				subtitle={defineTypeDialogSubtitle}
			/>
			{spinner}
			<MainPageHeadStyled>
				<MainHead
					mainTitle='Target2Need ISCB'
					mainSubtitle='(Interactive Search Campaign Builder)'
					subtitle='Interactively build search term sets that match your target audience’s information needs'
					info='To get started'
				/>
			</MainPageHeadStyled>
			<MainPageBodyStyled>
				<Stack spacing={4} direction='row' justifyContent='space-between'>
					<UploadCard>
						<Stack spacing={3} flexGrow={1}>
							<DownloadFile
								title='To get a sample json, click on the link below'
								json={{
									label: 'Download a sample json',
									href: `${process.env.PUBLIC_URL}/assets/testdata_prepared.json`
								}}
							/>
							<DropZone
								onDropAccepted={onDropAccepted}
								actionLabel='Drop the files here ...'
								label='Drag & Drop some files here, or click to select files'
								description='(Only .json file and sizes not exceeding 40Mb are accepted)'
							/>
						</Stack>
					</UploadCard>
					<UploadCard>
						<Stack spacing={4} alignItems='center' width='100%'>
							<UploadTestFiles
								title='Or click the button to test the app in demo mode'
								uploadBtnLabel='Demo upload'
								onTestFileLoad={onTestFileLoad}
							/>
						</Stack>
					</UploadCard>
				</Stack>
			</MainPageBodyStyled>
		</MainPageStyled>
	);
};

export default MainPageContainer;