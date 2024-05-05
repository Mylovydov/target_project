import defaultTransformedFields from './defaultTransformedFields';
import getFieldType from './getFieldType';
import getTransformedFieldLabel from './getTransformedFieldLabel';

const getFieldsForTyping = content => {
	const transformedFields = content.reduce((acc, contentItem) => {
		const itemEntries = Object.entries(contentItem);
		let newAcc = { ...acc };

		for (let i = 0; i < itemEntries.length; i++) {
			const [key, value] = itemEntries[i];

			if (!newAcc[key]) {
				const newFieldItem = {
					typeInput: {
						name: 'typeInput',
						value: getFieldType(value),
						disabled: false
					},
					labelInput: {
						name: 'labelInput',
						value: getTransformedFieldLabel(key),
						disabled: false
					},
					categoricalInput: {
						name: 'categoricalInput',
						value: false,
						disabled: false
					}
				};

				newAcc = {
					...newAcc,
					[key]: newFieldItem
				};
			}
		}

		return newAcc;
	}, {});

	return {
		...transformedFields,
		...defaultTransformedFields
	};
};

export default getFieldsForTyping;
