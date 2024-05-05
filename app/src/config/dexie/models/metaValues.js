import {
	metaValuesObjectStoreFields,
	metaValuesObjectStoreName
} from '../constants';

const { userId, metaKeyId, value } = metaValuesObjectStoreFields;

const metaValuesModel = {
	[metaValuesObjectStoreName]: `
			++id,
			${userId},
			${metaKeyId},
			${value}
		`
};

export default metaValuesModel;
