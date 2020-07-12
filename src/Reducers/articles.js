import * as Types from "../Constants";
var initialState = {
    articles: [],
    articleInfo: null,
};

const Articles = (state = initialState, action) => {
    switch (action.type) {
        case Types.FETCH_LIST_ARTICLE_SUCCESS:
            return {
                ...state,
                articles: action.payload.articles,
            };
        case Types.GET_ARTICLE_INFO_SUCCESS:
            let status =
                action.payload.article[0].status === "0" ? false : true;
            let article = { ...action.payload.article[0], status: status };
            return { ...state, articleInfo: article };
        case Types.GET_ARTICLE_INFO_FAILED:
            return { ...state, articleInfo: "404" };
        default:
            return state;
    }
};
export default Articles;
