import jwtFetch from "./jwt";

export const RECEIVE_COMMENTS = "COMMENTS/RECEIVE"
export const RECEIVE_COMMENT = "COMMENT/RECEIVE"
export const REMOVE_COMMENT = "COMMENT/REMOVE"
export const RECEIVE_COMMENT_ERRORS = "COMMENTS/RECEIVE_COMMENT_ERRORS";
export const CLEAR_COMMENT_ERRORS = "COMMENTS/CLEAR_COMMENT_ERRORS";


const receiveComments = (comments) => (
    {
        type: RECEIVE_COMMENTS,
        comments
    }
);

const receiveComment = (Comment) => (
    {
        type: RECEIVE_COMMENT,
        Comment
    }
);

const removeComment = (payload) => (
    {
        type: REMOVE_COMMENT,
        payload
    }
);

const receiveErrors = (errors) => (
    {
        type: RECEIVE_COMMENT_ERRORS,
        errors
    }
);

const clearCommentErrors = () => (
    {
        type: CLEAR_COMMENT_ERRORS
    }
);

export const getComments = (state) => (
    state.comments ? Object.values(state.comments) : []
)

export const getComment = (commentId) => (state) => (
    state.comments ? state.comments[commentId] : null
)


export const fetchComments = id => async dispatch => {
    try {
        const res = await jwtFetch(`/api/${id}`);
        const comments = await res.json();
        dispatch(receiveComments(comments));
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            dispatch(receiveErrors(resBody.errors))
        }
    }
}

export const createComment = (commentData) => async dispatch => {
    try {
        const res = await jwtFetch('/api/tweets/', {
            method: 'POST',
            body: JSON.stringify(commentData)
        });
        const comment = await res.json();
        dispatch(receiveComment(comment));
    } catch(err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            return dispatch(receiveErrors(resBody.errors));
        }
    }
}

export const updateComment = (commentData) => async dispatch => {
    try {
        const res = await jwtFetch('/api/tweets/', {
            method: 'PATCH',
            body: JSON.stringify(commentData)
        });
        const comment = await res.json();
        dispatch(receiveComment(comment));
    } catch(err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            return dispatch(receiveErrors(resBody.errors));
        }
    }
}

export const deleteComment = (commentId) => async dispatch => {
    const response = await jwtFetch(`/api/comments/${commentId}`, {
        method: "DELETE"
    });
    if (response.ok) {
        dispatch(removeComment(commentId))
    }
}

export default function commentsReducer(oldState = {}, action) {
    switch (action.type) {
        case RECEIVE_COMMENT:
            return action.comments
        case RECEIVE_COMMENT:
            return {...oldState, [action.comment.id] : action.comment}
        case REMOVE_COMMENT:
            let newState = {...oldState}
            delete newState[action.payload]
            return newState
        default:
            return oldState;
    }
}

const nullErrors = null;


export const commentErrorsReducer = (state = nullErrors, action) => {
    switch(action.type) {
        case RECEIVE_COMMENT_ERRORS:
            return action.errors;
        case RECEIVE_COMMENT:
        case CLEAR_COMMENT_ERRORS:
            return nullErrors;
        default:
            return state;
    }
}