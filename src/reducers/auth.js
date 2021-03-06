import {
    LOGIN,
    REGISTER,
    ASYNC_START,
    UPDATE_FIELD_AUTH,
    LOGIN_PAGE_UNLOADED,
    REGISTER_PAGE_UNLOADED
} from '../constants/actionTypes';

export default (state = {}, action) => {
    switch (action.type) {
        case LOGIN:
        case REGISTER:
            console.log('auth login', action);
            return {
                ...state,
                inProgress: false,
                errors: action.error ? action.payload.errors : null
            };
        case ASYNC_START:
            if (action.subtype === 'LOGIN' || action.subtype === 'REGISTER') {
                return {...state, inProgress: true};
            }
            break;
        case UPDATE_FIELD_AUTH:
            return {...state, [action.key]: action.value};
        case LOGIN_PAGE_UNLOADED:
        case REGISTER_PAGE_UNLOADED:
            return {};
    }
    return state;
};