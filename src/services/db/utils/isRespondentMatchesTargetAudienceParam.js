import { boolAttributesName, categoricalAttributesName } from '../../../constants';

const isRespondentMatchesTargetAudienceParam = (respondent, filter) => {
	return filter.every(({ type, name, value }) => {
		const respondentAttrValue = respondent[name];

		switch (type) {
			case boolAttributesName:
				return !!respondentAttrValue;
			case categoricalAttributesName:
				return value.includes(respondentAttrValue);
			default:
				return respondentAttrValue >= value[0] && respondentAttrValue <= value[1];
		}
	});
};

export default isRespondentMatchesTargetAudienceParam;