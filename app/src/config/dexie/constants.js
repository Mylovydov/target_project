export const DBName = 'Target2Need';
export const usersObjectStoreName = 'users';
export const metaKeysObjectStoreName = 'meta_keys';
export const metaValuesObjectStoreName = 'meta_values';
export const discoverOptionsObjectStoreName = 'discover_options';

export const defaultUploadDataFields = {
	userId: 'user_id',
	searchTerm: 'search_term',
	infoNeed: 'info_need',
	needId: 'need_id',
	needProbability: 'need_probability'
};

export const needIdAndInfoNeedIndex = `[${defaultUploadDataFields.needId}+${defaultUploadDataFields.infoNeed}]`;

export const usersObjectStoreFields = {
	...defaultUploadDataFields,
	X: 'X',
	Y: 'Y',
	needIdAndInfoNeedIndex
};

export const metaKeysObjectStoreFields = {
	name: 'name',
	label: 'label',
	type: 'type',
	isCategorical: 'isCategorical',
	metaKeysIndex: '[name+label+type+isCategorical]'
};

export const metaValuesObjectStoreFields = {
	metaKeyId: 'metaKeyId',
	userId: 'userId',
	value: 'value'
};
