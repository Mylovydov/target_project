import { rangeProbabilityFilterName } from '../../../constants';

const checkFiltersMatching = (filters, searchTermItem) => {
	return Object.entries(filters).every(([filterName, value]) => {
		switch (filterName) {
			case rangeProbabilityFilterName:
				const searchTermProbability = searchTermItem.needProbability * 100;
				return (
					searchTermProbability > value[0] && searchTermProbability <= value[1]
				);
			default:
				return searchTermItem.searchTerm
					.toLowerCase()
					.startsWith(value.toLowerCase());
		}
	});
};

export default checkFiltersMatching;
