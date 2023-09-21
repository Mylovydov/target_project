import MainPage from '../pages/mainPage/MainPage';
import StatisticPage from '../pages/statisticPage/StatisticPage';
import DiscoverPage from '../pages/discoverPage/DiscoverPage';
import TargetAudiencePage from '../pages/targetAudiencePage/TargetAudiencePage';
import RevealInformationPage from '../pages/revealInformationPage/RevealInformationPage';

const appRoutes = [
	{ path: '/', label: 'Home', index: true, Component: MainPage },
	{ path: '/statistic', label: 'Statistic', Component: StatisticPage },
	{ path: '/discover', label: 'Discover', Component: DiscoverPage },
	{ path: '/target-audience', label: 'Target Audience', Component: TargetAudiencePage },
	{ path: '/reveal-information', label: 'Reveal Information', Component: RevealInformationPage }
];

export default appRoutes;