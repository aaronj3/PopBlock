import { combineReducers } from 'redux';
import { sessionErrorsReducer } from './session';
import commentsReducer from './comments';

export default combineReducers({
    session: sessionErrorsReducer
});
