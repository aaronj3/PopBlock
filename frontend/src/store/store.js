import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import uiReducer from './ui';
import sessionReducer from './session';
import commentsReducer from './comments';
import postsReducer from './posts';
import errors from './errors';

const rootReducer = combineReducers({
    ui: uiReducer,
    session: sessionReducer,
    comments: commentsReducer,
    posts: postsReducer,
    errors
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
    } else {
        const logger = require('redux-logger').default;
        const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
        enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;


