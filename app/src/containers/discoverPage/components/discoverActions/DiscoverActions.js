import React, { useRef, useState } from 'react';
import {
	ActionsStyled,
	DiscoverActionsBodyStyled,
	DiscoverActionsFooterStyled,
	DiscoverActionsHeadStyled,
	DiscoverActionsStyled
} from './discoverFilter.styled';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import Collapse from '@mui/material/Collapse';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Select from '../../../../components/select/Select';
import EditIcon from '@mui/icons-material/Edit';
import Popover from '../../../../components/popover/Popover';
import SortableTable from '../../../../components/sortableTable/SortableTable';
import {
	CSVFormat,
	editInfoNeedLabelHelperText,
	filterHelpText,
	JSONFormat
} from '../../../../constants';
import Alert from '@mui/material/Alert';
import TextInput from '../../../../components/textInput/TextInput';
import Button from '../../../../components/button/Button';
import { defaultUploadDataFields } from '../../../../config/dexie';
import useNotification from '../../../../hooks/useNotification';
import HelpTooltip from '../../../../components/helpTooltip/HelpTooltip';

const DiscoverActions = ({
	onChangeFilter,
	infoNeedOptions,
	infoNeedIdOptions,
	selectedInfoNeedId,
	selectedInfoNeed,
	tableRows,
	tableHeadings,
	onInfoNeedEdit,
	onDownloadFile,
	isDemoMode
}) => {
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const editInputRef = useRef(null);
	const { open: openNotification } = useNotification();

	const handleInfoNeedEdit = () => {
		const inputValue = editInputRef.current.value;
		if (!inputValue) {
			return openNotification({
				message: 'The value of the "Information Need" field cannot be empty',
				variant: 'error'
			});
		}

		if (onInfoNeedEdit) {
			onInfoNeedEdit(inputValue);
			setAnchorEl(null);
		}
	};

	const onEditDialogOpen = event => {
		setAnchorEl(event.currentTarget);
	};

	const onEditDialogClose = () => {
		setAnchorEl(null);
	};

	const tableMarkup = !!tableRows && (
		<SortableTable tableRows={tableRows} tableHeadings={tableHeadings} />
	);

	const demoModeMessageMarkup = isDemoMode && (
		<Alert severity="warning" sx={{ mt: 2, mb: 2 }}>
			<Typography variant="caption">
				You are now in demo mode. To be able to import a file, upload your own
				file
			</Typography>
		</Alert>
	);

	return (
		<DiscoverActionsStyled spacing={3}>
			<DiscoverActionsHeadStyled>
				<Stack direction="row" spacing={1} alignItems="center">
					<Typography variant="h6">Filters</Typography>
					<HelpTooltip title={filterHelpText} />
				</Stack>
				<Typography variant="body2">
					Select Information Need ID or Information Need
				</Typography>
			</DiscoverActionsHeadStyled>
			<DiscoverActionsBodyStyled spacing={3}>
				<ActionsStyled>
					<FormControl>
						<Select
							value={selectedInfoNeedId}
							onChange={onChangeFilter}
							name={defaultUploadDataFields.needId}
							id={defaultUploadDataFields.needId}
							label="Select Information Need ID"
							options={infoNeedIdOptions}
						/>
					</FormControl>
					<FormControl fullWidth sx={{ mt: '1.5rem' }}>
						<Select
							value={selectedInfoNeed}
							onChange={onChangeFilter}
							name={defaultUploadDataFields.infoNeed}
							id={defaultUploadDataFields.infoNeed}
							label="Select Information Need"
							options={infoNeedOptions}
						/>
					</FormControl>
					<Collapse in={!!tableRows} unmountOnExit timeout="auto">
						<Box sx={{ mt: '2rem' }}>
							<Stack direction="row" spacing={1} alignItems="center">
								<Chip
									label={selectedInfoNeed}
									deleteIcon={<EditIcon />}
									onDelete={onEditDialogOpen}
								/>
								<HelpTooltip title={editInfoNeedLabelHelperText} />
							</Stack>
							<Popover
								open={open}
								anchorEl={anchorEl}
								onClose={onEditDialogClose}
							>
								<Stack
									direction="row"
									spacing={1}
									sx={{
										padding: '1rem'
									}}
								>
									<TextInput
										defaultValue={selectedInfoNeed}
										inputRef={editInputRef}
									/>
									<Button onClick={handleInfoNeedEdit} label="Save" />
								</Stack>
							</Popover>
						</Box>
					</Collapse>
				</ActionsStyled>
				{tableMarkup}
			</DiscoverActionsBodyStyled>
			<DiscoverActionsFooterStyled>
				{demoModeMessageMarkup}
				<Button
					label="Export as json"
					disabled={isDemoMode}
					onClick={() => onDownloadFile(JSONFormat.format)}
				/>
				<Button
					label="Export as csv"
					disabled={isDemoMode}
					sx={{ mt: '1rem' }}
					onClick={() => onDownloadFile(CSVFormat.format)}
				/>
			</DiscoverActionsFooterStyled>
		</DiscoverActionsStyled>
	);
};

export default DiscoverActions;
