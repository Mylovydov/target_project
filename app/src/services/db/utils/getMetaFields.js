const getMetaFields = respondent => {
	const {
		user_id,
		search_term,
		info_need,
		need_probability,
		need_id,
		X,
		Y,
		...metaFields
	} = respondent;
	return metaFields;
};

export default getMetaFields;
