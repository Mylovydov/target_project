import React, { memo } from 'react';
import Typography from '@mui/material/Typography';
import TableToolbarStyled, {
	TableToolbarActionsStyled,
	TableToolbarLabelStyled
} from './tableToolbar.styled';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '../../../tooltip/Tooltip';

const TableToolbar = ({ hasSelected, actions = [], label, onClearAll }) => (
	<TableToolbarStyled selected={hasSelected}>
		<TableToolbarLabelStyled direction="row" spacing={1}>
			<Typography variant="body2" component="div">
				{label}
			</Typography>
			<Tooltip title="Clear Selected" placement="top" arrow={true}>
				<span>
					<IconButton disabled={!hasSelected} onClick={onClearAll}>
						<DeleteIcon fontSize="small" />
					</IconButton>
				</span>
			</Tooltip>
		</TableToolbarLabelStyled>

		<TableToolbarActionsStyled
			direction="row"
			spacing={2}
			useFlexGap
			flexWrap="wrap"
		>
			{actions}
		</TableToolbarActionsStyled>
	</TableToolbarStyled>
);

export default memo(TableToolbar);
