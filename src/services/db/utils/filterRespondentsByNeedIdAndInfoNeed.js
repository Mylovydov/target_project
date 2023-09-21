import { defaultUploadDataFields } from '../../../config/dexie';

const { needId, infoNeed } = defaultUploadDataFields;

const filterRespondentsByNeedIdAndInfoNeed = (respondents = [], selectedOptions) => {
	return respondents.reduce((acc, user) => {
		const isFilterMatch = user[needId] === +selectedOptions[needId]
			&& user[infoNeed] === selectedOptions[infoNeed];

		if (isFilterMatch) {
			return {
				usersToRowsData: [...acc.usersToRowsData, user],
				usersToChartData: [...acc.usersToChartData, user]
			};
		}

		return {
			...acc,
			usersToChartData: [...acc.usersToChartData, user]
		};
	}, {
		usersToRowsData: [],
		usersToChartData: []
	});
};

export default filterRespondentsByNeedIdAndInfoNeed;