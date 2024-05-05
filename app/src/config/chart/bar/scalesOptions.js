const scalesOptions = {
	x: {
		type: 'linear',
		ticks: {
			callback: value => value + '%'
		},
		min: 0,
		max: 100,
		beginAtZero: true
	},
	y: {
		beginAtZero: true
	}
};

export default scalesOptions;
