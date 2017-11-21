import { applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger';
import { localStorageMiddleware, promiseMiddleware } from './middleware';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import reducers from './reducers';

const getMiddleware = () => {
    if (process.env.NODE_ENV === 'production') {
        return applyMiddleware(promiseMiddleware, localStorageMiddleware);
    } else {
        return applyMiddleware(promiseMiddleware, localStorageMiddleware, logger);
    }
};

const store = createStore(reducers, composeWithDevTools(getMiddleware()));

export default store;