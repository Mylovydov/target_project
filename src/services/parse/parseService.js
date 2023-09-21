import Papa from 'papaparse';

export const csvToJson = (content, onComplete) => {
	Papa.parse(content, {
		header: true,
		skipEmptyLines: true,
		complete: onComplete
	});
};

export const parseJson = (content) => {
	return JSON.parse(content);
};

export const stringifyJson = (content) => {
	return JSON.stringify(content, undefined, 2);
};

export const jsonToCsv = (jsonData) => {
	return Papa.unparse(jsonData);
};
