import Stack from '@mui/material/Stack';
import Button from '../../../../components/button/Button';
import { memo } from 'react';

const DefineAudienceFormFooter = ({ onClear, applyBtnLabel, clearBtnLabel, disabled }) => (
	<Stack direction='row' spacing={2} justifyContent='end'>
		<Button
			size='large'
			type='button'
			onClick={onClear}
			color='error'
			label={clearBtnLabel}
			disabled={disabled}
		/>
		<Button
			size='large'
			label={applyBtnLabel}
			disabled={disabled}
		/>
	</Stack>
);

export default memo(DefineAudienceFormFooter);