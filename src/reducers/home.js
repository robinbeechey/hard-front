import {
    HOME_PAGE_LOADED,
    HOME_PAGE_UNLOADED,
    ASYNC_START,
    ARTICLE_SEARCH,
    ANALYSE_ARTICLE
} from '../constants/actionTypes';

const initialState = {
    inProgress: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case HOME_PAGE_LOADED:
            return {
                ...state,
                inProgress: false,
                tags: action.payload[0].tags
            };
        case HOME_PAGE_UNLOADED:
            return {};
        case ASYNC_START:
            if (action.subtype === ARTICLE_SEARCH || action.subtype === ANALYSE_ARTICLE) {
                return {...state, inProgress: true};
            }
            break;
        case ARTICLE_SEARCH:
            return {
                ...state,
                inProgress: false,
                searchResult: action.payload.articles.length === 0 ? null : action.payload.articles[0],
            };
        case ANALYSE_ARTICLE:
            return {
                ...state,
                inProgress: false,
                analyzedArticle: action.payload,
                errors: action.error ? action.payload.errors : null
            };
    }
    return state;
};