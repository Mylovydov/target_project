import React from 'react';
import { Stack, Typography } from '@mui/material';
import DiscoverActions from '../discoverActions/DiscoverActions';
import DiscoverBubblesChart from '../../../../components/discoverBubblesChart/DiscoverBubblesChart';
import Alert from '@mui/material/Alert';
import Card from '../../../../components/card/Card';
import { discoverInteractiveMapDisableMessage } from '../../../../constants';

const DiscoverCard = ({
	chartData,
	chartAxiosValues,
	onToggleOriginalBubblesSize,
	isOriginalBubblesSize,
	...props
}) => {
	const bubblesChartMarkup = chartAxiosValues ? (
		<DiscoverBubblesChart
			{...{
				chartData,
				chartAxiosValues,
				onToggleOriginalBubblesSize,
				isOriginalBubblesSize
			}}
		/>
	) : (
		<Stack justifyContent="center" alignItems="center" height="100%">
			<Alert severity="warning">
				<Typography>{discoverInteractiveMapDisableMessage}</Typography>
			</Alert>
		</Stack>
	);

	return (
		<Card>
			<Card.Info width="40rem">
				<DiscoverActions {...props} />
			</Card.Info>
			<Card.Actions padding={0}>{bubblesChartMarkup}</Card.Actions>
		</Card>
	);
};

export default DiscoverCard;
