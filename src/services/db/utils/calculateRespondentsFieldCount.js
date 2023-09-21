import { defaultUploadDataFields } from '../../../config/dexie';
import isRespondentMatchesTargetAudienceParam from './isRespondentMatchesTargetAudienceParam';

const calculateRespondentsFieldCount = (respondents, fieldName) => {
	return respondents.reduce((acc, respondent) => {
		const respondentInfoNeed = respondent[fieldName];

		if (acc[respondentInfoNeed]) {
			return { ...acc, [respondentInfoNeed]: ++acc[respondentInfoNeed] };
		}

		return { ...acc, [respondentInfoNeed]: 1 };
	}, {});
};

export const calculateRevealBarChartData = (respondents, filter) => {
	const { infoNeed, needId } = defaultUploadDataFields;

	return respondents.reduce((acc, respondent) => {
		const currentInfoNeed = respondent[infoNeed];
		const currentInfoNeedId = respondent[needId];
		const isRespondentMatch = isRespondentMatchesTargetAudienceParam(respondent, filter);

		if (acc[currentInfoNeed]) {
			return {
				...acc,
				[currentInfoNeed]: {
					...acc[currentInfoNeed],
					total: ++acc[currentInfoNeed].total,
					match: isRespondentMatch ? ++acc[currentInfoNeed].match : acc[currentInfoNeed].match,
					temp: [...acc[currentInfoNeed].temp, isRespondentMatch ? 1 : 0],
				}
			};
		}

		return {
			...acc,
			[currentInfoNeed]: {
				total: 1,
				match: isRespondentMatch ? 1 : 0,
				temp: [isRespondentMatch ? 1 : 0],
				infoNeedId: currentInfoNeedId
			}
		};
	}, {});
};

export default calculateRespondentsFieldCount;