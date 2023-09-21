import useLocalStorage from '../../../hooks/useLocalStorage';
import { localStorageSearchTermSetKey } from '../../../constants';
import { useCallback } from 'react';

const useAddTermToSearchTermSet = () => {
	const [searchTermsSet, setSearchTermSet] = useLocalStorage(localStorageSearchTermSetKey, []);

	const addSearchTermSet = useCallback((newSetToAdd) => {
		const uniqueSet = new Set([...searchTermsSet, ...newSetToAdd])

		setSearchTermSet([...uniqueSet])
	}, [searchTermsSet, setSearchTermSet]);

	return {
		addSearchTermSet
	}
};

export default useAddTermToSearchTermSet