import { useLocation } from 'react-router-dom';
import useLocalStorage from './useLocalStorage';
import { localStorageNavigationsKey, routes } from '../constants';
import { useCallback, useEffect } from 'react';

const useEnabledNav = () => {
	const [enableNav, setEnableNav] = useLocalStorage(localStorageNavigationsKey, null);
	const location = useLocation();

	useEffect(() => {
		const { pathname } = location;

		if (pathname === routes.statistic) {
			const updatedEnableNav = enableNav
				? enableNav
				: [routes.statistic, routes.home, routes.discover, routes.targetAudience];

			setEnableNav(updatedEnableNav);
		}

	}, [location, setEnableNav]);

	const addNavItem = useCallback((navItem) => {
		const navExists = enableNav.includes(navItem)

		return navExists ? null : setEnableNav([...enableNav, navItem])
	}, [enableNav, setEnableNav]);

	return [enableNav, addNavItem]
};

export default useEnabledNav