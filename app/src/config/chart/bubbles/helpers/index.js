import color from 'randomcolor';
import { setValueToLocalStorage } from '../../../../services/localStorage/localStorageService';
import { localStorageAxiosKey } from '../../../../constants';
// import { alpha } from '@mui/material';

// Updated
// export const getColorGenerator = () => {
// 	const hash = {};
//
// 	return (id) => {
// 		if (hash[id]) {
// 			return hash[id];
// 		}
//
// 		const mainColor = color({
// 			luminosity: 'bright',
// 			alpha: 1,
// 		});
//
// 		hash[id] = {
// 			backgroundColor: alpha(mainColor, 0.4),
// 			borderColor: mainColor
// 		};
// 		return hash[id];
// 	};
// };

// old
export const getColorGenerator = () => {
	const hash = {};

	return id => {
		if (hash[id]) {
			return hash[id];
		}

		const mainColor = color({
			luminosity: 'dark',
			format: 'rgba',
			alpha: 0.3
		});

		hash[id] = {
			backgroundColor: mainColor,
			borderColor: mainColor
		};
		return hash[id];
	};
};

export const transformLegendItems = items => {
	const legendItems = items.reduce((acc, item) => {
		const infoNeedId = item.text.infoNeedId;
		const currentLegendItem = acc[infoNeedId];

		if (!currentLegendItem) {
			return {
				...acc,
				[infoNeedId]: {
					...item,
					datasetIndexes: [item.datasetIndex]
				}
			};
		}

		return {
			...acc,
			[infoNeedId]: {
				...item,
				datasetIndexes: [...currentLegendItem.datasetIndexes, item.datasetIndex]
			}
		};
	}, {});

	return Object.values(legendItems);
};

const contentHasAxiosValue = respondents => {
	return respondents.every(respondent => {
		const contentX = respondent.X;
		const contentY = respondent.Y;

		return contentX && contentY;
	});
};

export const setMinMaxAxiosValueToStorage = (respondents = []) => {
	const respondentsHaveAxiosValue = contentHasAxiosValue(respondents);

	if (!respondentsHaveAxiosValue) {
		return setValueToLocalStorage(localStorageAxiosKey, null);
	}

	let minX = 0;
	let maxX = 0;
	let minY = 0;
	let maxY = 0;

	respondents.forEach(respondent => {
		const axiosX = respondent.X;
		const axiosY = respondent.Y;

		minX = Math.min(minX, axiosX);
		maxX = Math.max(maxX, axiosX);
		minY = Math.min(minY, axiosY);
		maxY = Math.max(maxY, axiosY);
	});

	minY = minY === 0 ? minY : minY - 5;
	minX = minX === 0 ? minX : minX - 5;
	maxY += 5;
	maxX += 5;

	const storageValue = {
		y: { min: minY, max: maxY },
		x: { min: minX, max: maxX }
	};

	return setValueToLocalStorage(localStorageAxiosKey, storageValue);
};
