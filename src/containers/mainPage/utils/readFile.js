import { parseJson } from '../../../services/parse/parseService';

// const readCsvOrJsonFile = (file) => {
// 	return new Promise((resolve, reject) => {
// 		const isCSV = file.type === CSVFormat.format;
// 		const reader = new FileReader();
//
// 		reader.onload = () => {
// 			const content = reader.result;
//
// 			if (isCSV) {
// 				csvToJson(
// 					content,
// 					(result) => {
// 						resolve(result.data);
// 					}
// 				);
// 			} else {
// 				resolve(parseJson(content));
// 			}
// 		};
//
// 		reader.onerror = () => {
// 			reject(reader.error);
// 		};
//
// 		reader.readAsText(file);
// 	});
// };

const readJsonFile = (file) => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();

		reader.onload = () => {
			const content = reader.result;
			resolve(parseJson(content));
		};

		reader.onerror = () => {
			reject(reader.error);
		};

		reader.readAsText(file);
	});
};

export default readJsonFile;