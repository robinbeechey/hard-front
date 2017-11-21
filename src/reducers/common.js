import {
    APP_LOAD,
    REDIRECT,
    LOGOUT,
    SETTINGS_SAVED,
    LOGIN,
    REGISTER,
    DELETE_ARTICLE,
    ARTICLE_SUBMITTED,
    UPDATE_AVATAR

} from '../constants/actionTypes';

const defaultState = {
    appName: 'HARD',
    token: null
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case APP_LOAD:
            return {
                ...state,
                token: action.token || null,
                appLoaded: true,
                currentUser: action.payload ? action.payload.user : null
            };

        case REDIRECT:
            return {...state, redirectTo: null};
        case LOGOUT:
            return {
                ...state,
                redirectTo: '/',
                token: null,
                currentUser: null
            };
        case SETTINGS_SAVED:
            if (action.error) {
                return {
                    ...state
                };
            }
            return {
                ...state,
                currentUser: action.payload.user,
            };

        case LOGIN:
        case REGISTER:
            return {
                ...state,
                redirectTo: action.error ? null : '/',
                token: action.error ? null : action.payload.user.token,
                currentUser: action.error ? null : action.payload.user
            };
        case DELETE_ARTICLE:
            return {...state, redirectTo: '/'};
        case ARTICLE_SUBMITTED:
            const redirectUrl = `article/${action.payload.article.slug}`;
            return {
                ...state,
                redirectTo: redirectUrl
            };
        case UPDATE_AVATAR:
            if (action.error) {
                return {
                    ...state
                };
            }
            return {
                ...state,
                currentUser: action.payload.user,
            };

    }
    return state;
};