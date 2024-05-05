import React, { useMemo } from 'react';
import {
	StatisticPageBodyStyled,
	StatisticPageFooterStyled,
	StatisticPageHeadStyled,
	StatisticPageStyled
} from './statisticPage.styled';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import StatisticHead from './components/statiscticHead/StatisticHead';
import StatisticTable from '../../components/statisticTable/StatisticTable';
import { useLiveQuery } from 'dexie-react-hooks';
import AppBackdrop from '../../components/appBackdrop/AppBackdrop';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../constants';
import useIndexedDBService from '../../services/db/indexedDBService';
import StepButton from '../../components/stepButton/StepButton';

const StatisticPageContainer = () => {
	const { getStatistic } = useIndexedDBService();
	const statisticQueryResult = useLiveQuery(getStatistic);
	const navigate = useNavigate();

	const headingsItem = useMemo(
		() => [
			{ label: 'Number of observations', align: 'center' },
			{ label: 'Number of respondents', align: 'center' },
			{ label: 'Number of unique search terms', align: 'center' },
			{ label: 'Number of information needs', align: 'center' },
			{ label: 'Number of respondent attributes', align: 'center' },
			{ label: 'List of attributes', align: 'center' }
		],
		[]
	);

	const rowMarkup = statisticQueryResult && (
		<TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
			<TableCell align="center">
				<Typography variant="h6">
					{statisticQueryResult.numberOfObservations}
				</Typography>
			</TableCell>
			<TableCell align="center">
				<Typography variant="h6">
					{statisticQueryResult.numberOfRespondents}
				</Typography>
			</TableCell>
			<TableCell align="center">
				<Typography variant="h6">
					{statisticQueryResult.numberOfUniqueSearchTerm}
				</Typography>
			</TableCell>
			<TableCell align="center">
				<Typography variant="h6">
					{statisticQueryResult.numberOfInformationNeeds}
				</Typography>
			</TableCell>
			<TableCell align="center">
				<Typography variant="h6">
					{statisticQueryResult.numberOfRespondentAttr}
				</Typography>
			</TableCell>
			<TableCell sx={{ maxWidth: '25rem' }}>
				{statisticQueryResult.respondentAttrList.map(attr => (
					<Typography key={attr} variant="caption" component="p">
						{attr}
					</Typography>
				))}
			</TableCell>
		</TableRow>
	);

	if (!statisticQueryResult) {
		return <AppBackdrop open={!statisticQueryResult} />;
	}

	return (
		<StatisticPageStyled>
			<StatisticPageHeadStyled>
				<StatisticHead title="Downloaded file statistics" />
			</StatisticPageHeadStyled>

			<StatisticPageBodyStyled>
				<StatisticTable headings={headingsItem}>{rowMarkup}</StatisticTable>
			</StatisticPageBodyStyled>

			<StatisticPageFooterStyled>
				<Stack direction="row" justifyContent="center" spacing={3}>
					<StepButton
						onClick={() => navigate(routes.home)}
						label="Previous step"
						color="warning"
					/>
					<StepButton
						onClick={() => navigate(routes.discover)}
						label="Next step"
					/>
				</Stack>
			</StatisticPageFooterStyled>
		</StatisticPageStyled>
	);
};

export default StatisticPageContainer;
