import Stack from '@mui/material/Stack';
import Button from '../../../../components/button/Button';
import { memo } from 'react';
import Typography from '@mui/material/Typography';

const DefineAudienceFormFooter = ({
	onClear,
	applyBtnLabel,
	clearBtnLabel,
	disabled,
	currentTargetAudience
}) => {
	const targetAudienceNumberMarkup = currentTargetAudience && (
		<Typography>
			Observations in Target Audience{' '}
			{`${currentTargetAudience.matching} / ${currentTargetAudience.total}`}
		</Typography>
	);

	return (
		<Stack direction="row" spacing={3} justifyContent="end" alignItems="center">
			{targetAudienceNumberMarkup}
			<Button
				size="large"
				type="button"
				onClick={onClear}
				color="error"
				label={clearBtnLabel}
				disabled={disabled}
			/>
			<Button size="large" label={applyBtnLabel} disabled={disabled} />
		</Stack>
	);
};

export default memo(DefineAudienceFormFooter);
