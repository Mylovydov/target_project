const calculateStandardError = array => {
	const count = array.length;
	const sum = array.reduce((acc, value) => acc + value, 0);
	const mean = sum / count;
	const variance =
		array.reduce((acc, value) => acc + Math.pow(value - mean, 2), 0) /
		(count - 1);
	return Math.sqrt(variance) / Math.sqrt(count);
};

export default calculateStandardError;
