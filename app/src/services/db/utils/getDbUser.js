const getDbUser = respondent => ({
	user_id: respondent.user_id,
	search_term: respondent.search_term,
	info_need: respondent.info_need,
	need_probability: respondent.need_probability,
	need_id: respondent.need_id,
	X: respondent?.X,
	Y: respondent?.Y
});

export default getDbUser;
