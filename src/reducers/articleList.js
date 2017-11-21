import {
    ARTICLE_FAVORITED,
    ARTICLE_UNFAVORITED,
    HOME_PAGE_LOADED,
    HOME_PAGE_UNLOADED,
    APPLY_TAG_FILTER,
    PROFILE_PAGE_LOADED,
    PROFILE_PAGE_UNLOADED,
    PROFILE_FAVORITES_PAGE_LOADED,
    PROFILE_FAVORITES_PAGE_UNLOADED,
    SET_PAGE,
    CHANGE_TAB,

} from '../constants/actionTypes';

export default (state = {}, action) => {
    switch (action.type) {
        case ARTICLE_FAVORITED:
        case ARTICLE_UNFAVORITED:
            return {
                ...state,
                articles: state.articles.map(article=> {
                    if (article.slug === action.payload.article.slug) {
                        return {
                            ...article,
                            favorited: action.payload.article.favorited,
                            favoritesCount: action.payload.article.favoritesCount
                        }
                    }
                    return article;
                })
            };
        case HOME_PAGE_LOADED:
            return {
                ...state,
                articles: action.payload[1].articles,
                articlesCount: action.payload[1].articlesCount,
                tab: action.tab,
                currentPage: 0
            };
        case APPLY_TAG_FILTER:
            return {
                ...state,
                articles: action.payload.articles,
                articlesCount: action.payload.articlesCount,
                tab: null,
                tag: action.tag,
                currentPage: 0
            };
        case HOME_PAGE_UNLOADED:
            return {};
        case PROFILE_PAGE_LOADED:
        case PROFILE_FAVORITES_PAGE_LOADED:
            return {
                ...state,
                articles: action.payload[1].articles,
                articlesCount: action.payload[1].articlesCount,
                currentPage: 0
            };
        case PROFILE_PAGE_UNLOADED:
        case PROFILE_FAVORITES_PAGE_UNLOADED:
            return {};
        case SET_PAGE:
            return {
                ...state,
                articles: action.payload.articles,
                articlesCount: action.payload.articlesCount,
                currentPage: action.page
            };
        case CHANGE_TAB:
            return {
                ...state,
                articles: action.payload.articles,
                articlesCount: action.payload.articlesCount,
                tab: action.tab,
                currentPage: 0
            };
    }
    return state;
}