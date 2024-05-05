import React from 'react';
import MainPage from '../../pages/mainPage/MainPage';
import { Route, Routes } from 'react-router-dom';
import StatisticPage from '../../pages/statisticPage/StatisticPage';
import AppLayout from '../appLayout/AppLayout';
import DiscoverPage from '../../pages/discoverPage/DiscoverPage';
import { routes } from '../../constants';
import TargetAudiencePage from '../../pages/targetAudiencePage/TargetAudiencePage';
import RevealInformationPage from '../../pages/revealInformationPage/RevealInformationPage';
import BuildSetPage from '../../pages/buildSetPage/BuildSetPage';

const App = () => {
	return (
		<main>
			<Routes>
				<Route path={routes.home} element={<AppLayout />}>
					<Route index element={<MainPage />} />
					<Route path={routes.statistic} element={<StatisticPage />} />
					<Route path={routes.discover} element={<DiscoverPage />} />
					<Route
						path={routes.targetAudience}
						element={<TargetAudiencePage />}
					/>
					<Route
						path={routes.revealInformation}
						element={<RevealInformationPage />}
					/>
					<Route path={routes.buildSearchTermSet} element={<BuildSetPage />} />
				</Route>
			</Routes>
		</main>
	);
};

export default App;
