export const routes = {
	home: '/',
	statistic: '/statistic',
	discover: '/discover',
	targetAudience: '/target-audience',
	revealInformation: '/reveal-information',
	mostRelevantSearchTerm: '/most-relevant-search-term',
	buildSearchTermSet: '/build-search-term-set'
};

export const navigations = [
	{ path: routes.home, label: 'Home' },
	{ path: routes.statistic, label: 'Statistic' },
	{ path: routes.discover, label: 'Discover' },
	{ path: routes.targetAudience, label: 'Target Audience' },
	{ path: routes.revealInformation, label: 'Reveal Information' },
	{ path: routes.buildSearchTermSet, label: 'Build Search Term Set' }
];

export const mobileDeviceResolution = 768;

// MAIN PAGE
export const localStorageModeKey = 'isDemoMode';
export const localStorageAxiosKey = 'axiosValue';
export const localStorageNavigationsKey = 'navigations';
export const possibleDataTypes = ['string', 'number', 'boolean'];
export const discoverExportFileName = 'Target2Need_result';
export const fileMaxSize = 41943040;
export const CSVFormat = {
	name: 'csv',
	format: 'text/csv',
	variants: ['.csv']
};
export const JSONFormat = {
	name: 'json',
	format: 'application/json',
	variants: ['.json']
};
export const formFieldNameHelperText =
	'Name of the field specified in the loaded file';
export const formFieldTypeHelperText =
	'The field type is defined automatically based on the loaded data.';
export const formFieldLabelHelperText =
	'The name of the field formed automatically on the basis of the loaded data. If the name is not defined correctly, you can change it. Avoid identical names';
export const formFieldCategoricalHelperText =
	'A flag that indicates whether the field is categorical or not. Note that not all fields describing a respondent are categorical, but only fields such as age, education level, and similar. Fields with values 0-1 (boolean type) are NOT categorical';

// IDENTIFY FILTER HELPER TEXT
export const identifyFilterRangeHelperText =
	'If you change the range, the table will contain search queries whose "Need Probability" parameter is included in the range. The default range is 0 to 100%';
export const identifyFilterTermNumberHelperText =
	'Show top 100 (by default) search queries. If there are more than 100 search queries, then 100 will be displayed, but you can change the number of search queries displayed';
export const identifyFilterTermNameInputHelperText =
	'Start typing the name of the search query';

// DISCOVER PAGE
export const MAX_RAD = 50;
export const discoverInteractiveMapTitle = 'INTERACTIVE MAP OF SEARCH TERMS';
export const discoverInteractiveMapSubtitle =
	'The closeness of the bubbles expresses the semantic similarity of the search terms, and the size of the bubbles indicates the number of identical search terms related to the same information needs\n';
export const discoverInteractiveMapLegendContainerId = 'legend-container';
export const discoverInteractiveMapDisableMessage =
	'To display the interactive map, please specify X and Y coordinates in the downloaded file';
export const defineTypeDialogTitle =
	'Please check carefully the correctness of certain data types';
export const defineTypeDialogSubtitle =
	'If the field is of a categorical type, such as age, gender, education level, etc., then check the "Categorical" box';
export const tooltipSearchTermBeforeTitle = 'Search term:';
export const tooltipSearchTermBeforeLabel = 'Info Need:';
export const tooltipSearchTermBeforeFooter = 'Probability:';
export const filterHelpText =
	'Using filters, you will be able to select the desired searches by "Information Need" or "Need ID"';
export const editInfoNeedLabelHelperText =
	'Click on the handle icon to change the name of the selected information need. You will then be able to export the file with the changes applied to all information needs ';

// DEFINE TARGET AUDIENCE PAGE
export const localStorageDefineTargetAudienceAttrKey = 'attributes';
export const audienceDefinitionsStorageKey = 'audienceDefinitions';
export const localStorageDefineTargetAudienceFilter = 'audienceFilter';
export const localStorageEnableORFilterTypeKey = 'enableORFilterType';
export const boolAttributesName = 'booleanAttributes';
export const categoricalAttributesName = 'categoricalAttributes';
export const rangeAttributesName = 'rangeAttributes';
export const minRangeDistanceOfDTAPage = 5;
export const respondentAttributesHelperText =
	'You can select the attributes of the target audience, to display statistics on the selected target audience';

// REVEAL AUDIENCE INFORMATION NEEDS PAGE
export const audienceChartTitle =
	'Information needs based on the selected target audience';
export const tooltipStandardErrorTitle = 'Standard error of the mean';
export const barChartItemsLimit = 20;
export const minRangeDistanceOfRAINPage = 5;
export const rangeProbabilityFilterName = 'rangeProbability';
export const topSearchTermFilterName = 'topSearchTerm';
export const searchTermNameFilterName = 'searchTermName';
export const rowsPerPageOnRevealTable = 10;
export const localStorageSearchTermSetKey = 'searchTermSet';
export const REVEAL_DIALOG_DEFAULT_FILTERS = {
	[rangeProbabilityFilterName]: [0, 100],
	[topSearchTermFilterName]: 100,
	[searchTermNameFilterName]: ''
};

// IDENTIFY MOST RELEVANT SEARCH TERM POPUP
export const addToSearchTermsSetHelperText =
	'Add the selected search terms to the final set of search terms';

// BUILD SEARCH TERM SET PAGE
export const rowsPerPageOnBuildTable = 10;
export const BUILD_SET_PAGE_DEFAULT_FILTERS = {
	[rangeProbabilityFilterName]: [0, 100],
	[topSearchTermFilterName]: 100,
	[searchTermNameFilterName]: ''
};
export const removeSelectedTermsHelperText =
	'Remove selected search queries from the final set of queries';
export const exportSearchTermsSetHelperText =
	'Export a set of search terms in csv format';
export const finalExportFileName = 'Target2Need_final_result';
