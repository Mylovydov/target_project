import elementsOptions from './elementsOptions';
import animationOptions from './animationOptions';

const options = {
	responsive: true,
	aspectRatio: 1,
	events: ['dblclick', 'mousemove'],
	elements: elementsOptions,
	clip: 0,
	layout: {
		padding: 10
	},
	...animationOptions
};

export default options;