import parseJSON from './utils';

export const setValueToLocalStorage = (key, value) => {
	if (typeof window === 'undefined') {
		console.warn(
			`Tried setting localStorage key “${key}” even though environment is not a client`
		);
	}
	try {
		window.localStorage.setItem(key, JSON.stringify(value));
		window.dispatchEvent(new Event('local-storage'));
	} catch (err) {
		console.warn(`Error setting localStorage key “${key}”:`, err);
	}
};

export const getValueFromLocalStorage = (key, initialValue = '') => {
	if (typeof window === 'undefined') {
		console.warn(
			`Tried setting localStorage key “${key}” even though environment is not a client`
		);
	}

	try {
		const value = localStorage.getItem(key);
		return value ? parseJSON(value) : initialValue;
	} catch (err) {
		console.warn(`Error reading localStorage key “${key}”:`, err);
		return initialValue;
	}
};

export const removeItemsByKeyFromLocalStorage = (keys) => {
	if (!Array.isArray(keys)) {
		return localStorage.removeItem(keys);
	}

	keys.forEach(key => localStorage.removeItem(key));
};