import { usersObjectStoreFields, usersObjectStoreName } from '../constants';

const { userId, searchTerm, infoNeed, needId, needProbability, X, Y, needIdAndInfoNeedIndex } = usersObjectStoreFields;

const usersModel = {
	[usersObjectStoreName]: `
		++id,
		${userId},
		${searchTerm},
		${infoNeed},
		${needId},
		${needProbability},
		${X},
		${Y},
		${needIdAndInfoNeedIndex}
		`
};

export default usersModel;