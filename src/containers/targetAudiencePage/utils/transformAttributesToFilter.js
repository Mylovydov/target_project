import { boolAttributesName, categoricalAttributesName } from '../../../constants';

const transformAttributesToFilter = (attributes) => {
	return Object.entries(attributes).map(([type, attrValues]) => {
		switch (type) {
			case boolAttributesName:
				return attrValues.filter(({ value }) => value);
			case categoricalAttributesName:
				return attrValues.filter(({ value }) => value.length);
			default:
				return attrValues;
		}
	}).flat(Infinity);
};

export default transformAttributesToFilter;