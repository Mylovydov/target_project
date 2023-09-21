import { useCallback, useEffect, useState } from 'react';
import checkFiltersMatching from '../utils/checkFiltersMatching';
import {
	minRangeDistanceOfRAINPage,
	rangeProbabilityFilterName,
	searchTermNameFilterName,
	topSearchTermFilterName
} from '../../../constants';
import debounce from 'lodash.debounce';

const filterData = (itemsToFilter, filter) => {
	if (!itemsToFilter) {
		return null;
	}
	const filteredSearchTerms = itemsToFilter.filter(
		searchTermItem => checkFiltersMatching({
				[rangeProbabilityFilterName]: filter[rangeProbabilityFilterName],
				[searchTermNameFilterName]: filter[searchTermNameFilterName]
			},
			searchTermItem
		));

	return [...filteredSearchTerms]
		.sort((a, b) => b.needProbability - a.needProbability)
		.slice(0, filter[topSearchTermFilterName]);
};

const useRevealSearchTermsFilter = (defaultFilter, data, onFilteringComplete, debounceDelay = 300) => {
	const [filterValues, setFilterValues] = useState(defaultFilter);
	const [filteredTerms, setFilteredSearchTerms] = useState(filterData(data, defaultFilter));

	const filterSearchTerms = (itemsToFilter = [], filter) => {
		const filteredData = filterData(itemsToFilter, filter);
		setFilteredSearchTerms(filteredData);
		if (onFilteringComplete) {
			onFilteringComplete();
		}
	};

	const onChangeFilters = useCallback((event, newValue, activeThumb) => {
		const filterName = event.target.name;
		const filterValue = event.target.value;
		const filter = filterValues[filterName];

		let newFilterValue;

		switch (filterName) {
			case rangeProbabilityFilterName:
				if (!Array.isArray(newValue)) {
					return;
				}

				const minValue = filter[0];
				const maxValue = filter[1];

				newFilterValue = activeThumb === 0
					? [Math.min(newValue[0], maxValue - minRangeDistanceOfRAINPage), maxValue]
					: [minValue, Math.max(newValue[1], minValue + minRangeDistanceOfRAINPage)];
				break;
			case topSearchTermFilterName:
				if (!+filterValue) {
					return;
				}

				newFilterValue = +filterValue;
				break;
			default:
				newFilterValue = filterValue;
		}

		setFilterValues(prevFilters => ({
			...prevFilters,
			[filterName]: newFilterValue
		}));
	}, [filterValues]);

	const debouncedFilterTerms = useCallback(
		debounce(filterSearchTerms, debounceDelay, { trailing: true, leading: false }),
		[]
	);

	useEffect(() => {
		if (data) {
			debouncedFilterTerms(data, filterValues);
		}
	}, [data, debouncedFilterTerms, filterValues]);

	return {
		filteredTerms,
		onChangeFilters,
		filterValues,
		setFilterValues
	};
};

export default useRevealSearchTermsFilter;