import {
	defaultUploadDataFields,
	discoverOptionsObjectStoreName,
	needIdAndInfoNeedIndex
} from '../constants';

const { needId, infoNeed } = defaultUploadDataFields;

const discoverOptionsModel = {
	[discoverOptionsObjectStoreName]: `
		++id,
		${needId},
		${infoNeed},
		${needIdAndInfoNeedIndex}
		`
};

export default discoverOptionsModel;
