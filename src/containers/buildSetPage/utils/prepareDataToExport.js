import deepArrayComparison from './deepArrayComparison';

const prepareSearchTermsDataToExport = (searchTerms) => {
	return searchTerms.map(term => ({
		'Search Terms': term.searchTerm,
		'Information Needs': term.infoNeed,
		'Probabilities': term.needProbability,
	}));
};

const prepareDefinitionToExport = (definitionFilters) => {
	return definitionFilters.map((filter, i) => {
		const filterValue = Object.entries(filter).map(([filterName, value]) => {
			if (!value) {
				return `${filterName}`;
			}
			if (Array.isArray(value)) {
				return `${filterName}: ${value.join(', ')}`;
			}
			return `${filterName}: ${Number(value)}`;
		}).join('; ');
		return [`Target Audience ${i + 1}`, filterValue];
	});
};

const prepareDataToFinalExport = (definitionFilters, searchTerms) => {
	const uniqueDefinitionsFilters = deepArrayComparison(definitionFilters);

	const preparedDefinitionFilters = prepareDefinitionToExport(uniqueDefinitionsFilters);
	const preparedSearchTerms = prepareSearchTermsDataToExport(searchTerms);

	const searchTermsColumnHeaders = Object.keys(preparedSearchTerms[0]);

	const searchTermsToCSVExport = preparedSearchTerms.reduce((acc, term) => {
		const termArr = searchTermsColumnHeaders.map(key => term[key]);
		return [...acc, termArr];
	}, []);

	return [
		...preparedDefinitionFilters,
		[],
		searchTermsColumnHeaders,
		...searchTermsToCSVExport
	]
};

export default prepareDataToFinalExport;