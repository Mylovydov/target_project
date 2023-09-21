import { CSVFormat, discoverExportFileName } from '../../../constants';
import { jsonToCsv, stringifyJson } from '../../parse/parseService';
import createFileFromString from './createFileFromString';
import exportFile from './exportFile';

const exportJsonOrCSVFile = (dataToExport, format, exportFileName = discoverExportFileName) => {
	const dataStr = format === CSVFormat.format
		? jsonToCsv(dataToExport)
		: stringifyJson(dataToExport);

	const blob = createFileFromString(dataStr, format);
	exportFile(blob, exportFileName);
};

export default exportJsonOrCSVFile;