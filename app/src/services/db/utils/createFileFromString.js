const createFileFromString = (str, type) => {
	return new Blob([str], { type });
};

export default createFileFromString;
