import csrfFetch from './csrf';
// import { RECEIVE_POSTS, RECEIVE_POST } from './posts';


export const RECEIVE_REVIEWS = "comments/receive"
export const RECEIVE_REVIEW = "comment/receive"
export const REMOVE_REVIEW = "comment/remove"
// export const CLEAR_REVIEWS = "reviews/clear"

const receiveComments = (payload) => (
    {
        type: RECEIVE_COMMENTS,
        payload
    }
);

const receiveComment = (Comment) => (
    {
        type: RECEIVE_Comment,
        Comment
    }
);

const removeComment = (payload) => (
    {
        type: REMOVE_Comment,
        payload
    }
);

// const clearComments = () => (
//     {
//         type: CLEAR_CommentS
//     }
// );

export const getComments = (state) => (
    state.comments ? Object.values(state.comments) : []
)

export const getComment = (commentId) => (state) => (
    state.comments ? state.comments[commentId] : null
)


export const fetchComment = (comment_id) => async dispatch => {
    const response = await csrfFetch(`/api/comments/${comment_id}`)
    if (response.ok) {
        const comment = await response.json()
        dispatch(receiveComment(comment))
    }
}

export const createComment = (comment) => async dispatch => {
    const response = await csrfFetch(`/api/comments`, {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(comment)
    })
    if (response.ok) {
        const comment = await response.json()
        dispatch(receiveComment(comment))
    }
}

// export const updateComment = (comment) => async dispatch => {
//     const response = await csrfFetch(`/api/comments/${comment.id}`, {
//         method: "PATCH",
//         headers: {"Content-Type" : "application/json"},
//         body: JSON.stringify(comment)
//     })
//     if (response.ok) {
//         const comment = await response.json()
//         dispatch(receiveComment(comment))
//     }
// }

export const deleteComment = (commentId) => async dispatch => {
    const response = await csrfFetch(`/api/comments/${commentId}`, {
        method: "DELETE"
    });
    if (response.ok) {
        dispatch(removeComment(commentId))
    }
}

export default function commentReducer(oldState = {}, action) {
    switch (action.type) {
        case RECEIVE_POST:
            return action.comments
        case RECEIVE_CURRENT_USER_REVIEWS:
            return action.payload.comments
        case RECEIVE_COMMENT:
            return {...oldState, [action.comment.id] : action.comment}
        case REMOVE_COMMENT:
            let newState = {...oldState}
            delete newState[action.payload]
            return newState
        // case CLEAR_COMMENTS:
        //     return {};
        default:
            return oldState;
    }
}
