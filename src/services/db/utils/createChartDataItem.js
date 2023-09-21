const createChartDataItem = (respondent) => ({
	searchTerm: respondent.search_term,
	needProbability: respondent.need_probability,
	infoNeedLabel: respondent.info_need,
	infoNeedId: respondent.need_id,
	axiosX: respondent.X,
	axiosY: respondent.Y,
	count: 1
});

export default createChartDataItem;