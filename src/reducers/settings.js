import {
    SETTINGS_SAVED,
    ASYNC_START,
    UPDATE_AVATAR,
    SETTINGS_PAGE_UNLOADED,
    SETTINGS_PAGE_LOADED
} from '../constants/actionTypes';

const initialState = {
    inProgress: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SETTINGS_SAVED:
            console.log('settings reducer:', action);
            return {
                ...state,
                inProgress: false,
                successMessage: action.error ? null : 'Profile successfully updated',
                errors: action.error ? action.payload.errors : null,
            };
        case ASYNC_START:
            return {
                ...state,
                inProgress: true,
                successMessage: null,
            };
        case UPDATE_AVATAR:
            return {
                ...state,
                inProgress: false,
                successMessage: action.error ? null : 'Photo successfully uploaded',
                errors: action.error ? action.payload.errors : null
            };
        case SETTINGS_PAGE_UNLOADED:
            return {};
        case SETTINGS_PAGE_LOADED:
            return {
                ...state,
                inProgress: false,
            };
    }
    return state;
}