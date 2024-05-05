import {
	metaKeysObjectStoreFields,
	metaKeysObjectStoreName
} from '../constants';

const { name, label, type, isCategorical, metaKeysIndex } =
	metaKeysObjectStoreFields;

const metaKeysModel = {
	[metaKeysObjectStoreName]: `
			++id,
			${name},
			${label},
			${type},
			${isCategorical},
			${metaKeysIndex}
		`
};

export default metaKeysModel;
