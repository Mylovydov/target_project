import { useLiveQuery } from 'dexie-react-hooks';
import useIndexedDBService from '../../services/db/indexedDBService';
import AppBackdrop from '../../components/appBackdrop/AppBackdrop';
import React, { useCallback, useMemo, useState } from 'react';
import RevealInformationPageStyled, {
	RevealInformationPageBodyStyled,
	RevealInformationPageFooterStyled,
	RevealInformationPageHeadStyled,
	RevealInformationPageLegendStyled
} from './revealInformationPage.styled';
import Typography from '@mui/material/Typography';
import RevealCard from './components/revealCard/RevealCard';
import useLocalStorage from '../../hooks/useLocalStorage';
import {
	boolAttributesName,
	categoricalAttributesName,
	localStorageDefineTargetAudienceFilter,
	localStorageSearchTermSetKey,
	rangeAttributesName,
	routes
} from '../../constants';
import ChartLegend from './components/chartLegend/ChartLegend';
import RevealDialog from './components/revealDialog/RevealDialog';
import { transformBarChartData } from './utils/transformBarChartData';
import Stack from '@mui/material/Stack';
import NextStepButton from '../../components/nextStepButton/NextStepButton';
import { useNavigate } from 'react-router-dom';
import transformAudienceFilter from '../utils/transformAudienceFilter';

const legendItems = [
	{ label: 'Share of a particular target audience within the need', labelComponent: 'bar' },
	{ label: 'Share of the target audience in the data set (for all information needs).', labelComponent: 'line' },
	{ label: 'Standard error of the mean', labelComponent: 'standardError' }
];

const RevealInformationPageContainer = () => {
	const { getRevealPageData } = useIndexedDBService();
	const targetAudienceInformation = useLiveQuery(getRevealPageData);

	const [searchTermSet] = useLocalStorage(localStorageSearchTermSetKey, []);
	const [audienceFilter] = useLocalStorage(localStorageDefineTargetAudienceFilter, null);
	const [selectedInfoNeedItem, setSelectedInfoNeedItem] = useState(null);

	const navigate = useNavigate();

	const barChartData = useMemo(
		() => transformBarChartData(targetAudienceInformation),
		[targetAudienceInformation]
	);

	const transformedAudienceFilter = useMemo(() => {
		if (audienceFilter) {
			return transformAudienceFilter(audienceFilter.filterItems);
		}
	}, [audienceFilter]);

	const onBarItemClick = useCallback((infoNeedData) => {
		setSelectedInfoNeedItem(() => infoNeedData);
	}, []);

	const onDialogClose = () => {
		setSelectedInfoNeedItem(null);
	};

	const onNextBtnClick = () => {
		navigate(routes.buildSearchTermSet);
	};

	if (!barChartData) {
		return <AppBackdrop open={!barChartData}/>;
	}

	return (
		<>
			{selectedInfoNeedItem && (
				<RevealDialog
					open={!!selectedInfoNeedItem}
					selectedInfoNeedId={selectedInfoNeedItem.infoNeedId}
					title={`Identify most relevant search terms by "${selectedInfoNeedItem.infoNeed}"`}
					onClose={onDialogClose}
				/>
			)}
			<RevealInformationPageStyled>
				<RevealInformationPageHeadStyled>
					<Typography textAlign='center' variant='h4' component='h1'>
						Reveal audience's information needs
					</Typography>
				</RevealInformationPageHeadStyled>

				<RevealInformationPageLegendStyled>
					<ChartLegend items={legendItems}/>
				</RevealInformationPageLegendStyled>

				<RevealInformationPageBodyStyled>
					<RevealCard
						onBarItemClick={onBarItemClick}
						barChartData={barChartData}
						infoTitle='Selected respondent attributes'
						rangeInfoTitle='Selected range attributes'
						categoricalInfoTitle='Selected categorical attributes'
						boolInfoTitle='Selected boolean attributes'
						categoricalAttr={transformedAudienceFilter?.[categoricalAttributesName] || []}
						booleanAttr={transformedAudienceFilter?.[boolAttributesName] || []}
						rangeAttr={transformedAudienceFilter?.[rangeAttributesName] || []}
					/>
				</RevealInformationPageBodyStyled>

				<RevealInformationPageFooterStyled>
					<Stack direction='row' justifyContent='center'>
						<NextStepButton
							disabled={!searchTermSet.length}
							onClick={onNextBtnClick}
							label='Next step'
						/>
					</Stack>
				</RevealInformationPageFooterStyled>
			</RevealInformationPageStyled>
		</>
	);
};

export default RevealInformationPageContainer;