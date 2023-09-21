import createRowDataItem from './createRowDataItem';
import { defaultUploadDataFields } from '../../../config/dexie';

const defaultLegend = {
	id: 'id'
};

const getTableRowData = (
	respondentsArr,
	legend,
	hashField = defaultUploadDataFields.searchTerm
) => {
	const hash = new Set();

	return respondentsArr.reduce((acc, respondent) => {
		if (hash.has(respondent[hashField])) {
			return acc;
		}

		const newTableRowData = createRowDataItem(respondent, {...defaultLegend, ...legend});
		hash.add(respondent[hashField]);
		return [...acc, newTableRowData];
	}, []);
};

export default getTableRowData;