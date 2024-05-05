const transformDataToDB = ({
	user_id,
	search_term,
	info_need,
	need_probability,
	need_id,
	...rest
}) => ({
	user_id: user_id.toString().trim(),
	search_term: search_term.toString().trim(),
	info_need: info_need.toString().trim(),
	need_probability: parseInt(need_probability, 10),
	need_id: parseInt(need_id, 10),
	metadata: {
		...rest,
		X: rest?.X ?? rest?.x ?? null,
		Y: rest?.Y ?? rest?.y ?? null
	}
});

export default transformDataToDB;
