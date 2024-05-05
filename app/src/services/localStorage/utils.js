const parseJSON = value => {
	try {
		return value === 'undefined' ? undefined : JSON.parse(value ?? '');
	} catch {
		return undefined;
	}
};

export default parseJSON;
