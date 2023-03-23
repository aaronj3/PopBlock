import jwtFetch from "./jwt";
import {logoutUser} from "./session";

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

const removeComment = (comment) => (
    {
        type: REMOVE_COMMENT,
        comment
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

export const fetchComments = (postId) => async dispatch => {
    try {
        // console.log(postId)
        const url = postId ? `/api/comments/post/${postId}` : `/api/comments/user`
        // const url =  `/api/comments/post/${postId}`
        const res = await jwtFetch(url);
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
        const res = await jwtFetch(`/api/comments/${commentData.post_id}`, {
            method: 'POST',
            body: JSON.stringify(commentData)
        });
        dispatch(fetchComments(commentData.post_id))
    } catch(err) {
        if (err.status == 401) {
            dispatch(logoutUser());
        }
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            return dispatch(receiveErrors(resBody.errors));
        }
    }
}

export const updateComment = (commentData) => async dispatch =>
{
    try {
        const res = await jwtFetch(`/api/comments/${commentData._id}`, {
            method: 'PUT',
            body: JSON.stringify(commentData)
        });
        console.log(commentData.post_id)
        dispatch(fetchComments(commentData.post_id))
    } catch(err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            return dispatch(receiveErrors(resBody.errors));
        }
    }
}

export const deleteComment = (comment) => async dispatch => {
    const response = await jwtFetch(`/api/comments/${comment._id}`, {
        method: "DELETE"
    });
    if (response.ok) {
        dispatch(removeComment(comment))
        // dispatch(fetchComments(comment.post_id))
    }
}


export default function commentsReducer(oldState = {}, action) {
    let newState = {...oldState}
    switch (action.type) {
        case RECEIVE_COMMENTS:
            let postComments = {}
            for(let comment of action.comments) {
                postComments[comment._id] = comment
            }
            return postComments
        case RECEIVE_COMMENT:
            // console.log(action.comment._id)
            return { ...newState, [action.comment._id] : action.comment }
        case REMOVE_COMMENT:
            delete newState[action.comment._id]
            // console.log(action.comment._id)
            // console.log(newState)
            return newState
            // let newState = {...oldState}
            // console.log(newState)
            // return newState.filter(comment => comment._id !== action.comment._id)
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
