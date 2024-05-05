import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import parseJSON from '../services/localStorage/utils';

const useEventCallback = fn => {
	let ref = useRef(fn);
	useEffect(() => {
		ref.current = fn;
	});
	return useMemo(
		() =>
			(...args) => {
				const { current } = ref;
				return current(...args);
			},
		[]
	);
};

const useLocalStorage = (key, initialValue) => {
	const readValue = useCallback(() => {
		if (typeof window === 'undefined') {
			return initialValue;
		}

		try {
			const item = window.localStorage.getItem(key);
			return item ? parseJSON(item) : initialValue;
		} catch (error) {
			console.warn(`Error reading localStorage key “${key}”:`, error);
			return initialValue;
		}
	}, [initialValue, key]);

	const [storedValue, setStoredValue] = useState(readValue);

	useEffect(() => {
		setStoredValue(readValue());
	}, []);

	const handleStorageChange = useCallback(
		event => {
			if (event?.key && event.key !== key) {
				return;
			}
			setStoredValue(readValue());
		},
		[key, readValue]
	);

	useEffect(() => {
		if (window) {
			window.addEventListener('storage', handleStorageChange);
		}

		return () => {
			if (window) {
				window.removeEventListener('storage', handleStorageChange);
			}
		};
	}, [handleStorageChange]);

	useEffect(() => {
		if (window) {
			window.addEventListener('local-storage', handleStorageChange);
		}
		return () => {
			if (window) {
				window.removeEventListener('local-storage', handleStorageChange);
			}
		};
	}, [handleStorageChange]);

	const setValue = useEventCallback(value => {
		if (typeof window === 'undefined') {
			console.warn(
				`Tried setting localStorage key “${key}” even though environment is not a client`
			);
		}

		try {
			window.localStorage.setItem(key, JSON.stringify(value));
			setStoredValue(value);
			window.dispatchEvent(new Event('local-storage'));
		} catch (error) {
			console.warn(`Error setting localStorage key “${key}”:`, error);
		}
	});

	return [storedValue, setValue];
};

export default useLocalStorage;
