import { combineReducers } from 'redux';
import { sessionErrorsReducer } from './session';
import { commentErrorsReducer } from './comments';

export default combineReducers({
    session: sessionErrorsReducer,
    comments: commentErrorsReducer
});
