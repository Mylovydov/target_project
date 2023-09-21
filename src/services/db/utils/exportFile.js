const exportFile = (blob, filename) => {
	const anchor = document.createElement('a');
	anchor.setAttribute('download', filename);
	const url = URL.createObjectURL(blob);
	anchor.setAttribute('href', url);
	anchor.click();
	URL.revokeObjectURL(url);
};

export default exportFile;