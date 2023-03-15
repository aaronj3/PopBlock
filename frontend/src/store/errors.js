import { combineReducers } from 'redux';
import { sessionErrorsReducer } from './session';
import { commentErrorsReducer } from './comments';

export default combineReducers({
    session: sessionErrorsReducer,
    comments: commentErrorsReducer
});


const nullErrors = null;

export const sessionErrorsReducer = (state = nullErrors, action) => {
    switch(action.type) {
        case RECEIVE_SESSION_ERRORS:
            return action.errors;
        case RECEIVE_CURRENT_USER:
        case CLEAR_SESSION_ERRORS:
            return nullErrors;
        default:
            return state;
    }
};
