import agent from './agent';
import {
    ASYNC_START,
    APP_LOAD,
    REGISTER,
    LOGIN,
    LOGOUT,
    UPDATE_USER
} from './constants/actionTypes';

const promiseMiddleware = store => next => action => {
    if (isPromise(action.payload)) {
        store.dispatch({type: ASYNC_START, subtype: action.type});
        action.payload.then(
            res => {
                action.payload = res;
                store.dispatch(action);
            },
            error => {
                action.error = true;
                action.payload = error.response.body;
                store.dispatch(action);
            }
        );

        return;
    }
    next(action);
};


const localStorageMiddleware = store => next => action => {
    if (action.type === LOGIN || action.type === REGISTER) {
        if (!action.error) {
            window.localStorage.setItem('jwt', action.payload.user.token);
            agent.setToken(action.payload.user.token);
        }
    } else if (action.type === LOGOUT) {
        window.localStorage.setItem('jwt', '');
        agent.setToken(null);
    }

    next(action);
};


function isPromise(v) {
    return v && typeof v.then === 'function';
}


export {
    localStorageMiddleware,
    promiseMiddleware

}