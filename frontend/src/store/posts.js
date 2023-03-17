import jwtFetch from './jwt';
import { RECEIVE_USER_LOGOUT } from './session';
import { getCurrentUser } from './session';
import { useSelector } from 'react-redux';

const RECEIVE_POSTS = "posts/RECEIVE_POSTS";
const RECEIVE_POST = "posts/RECEIVE_POST"
const RECEIVE_USER_POSTS = "posts/RECEIVE_USER_POSTS";
// const RECEIVE_NEW_POST = "posts/RECEIVE_NEW_POST";
const RECEIVE_POST_ERRORS = "posts/RECEIVE_POST_ERRORS";
const CLEAR_POST_ERRORS = "posts/CLEAR_POST_ERRORS";
const REMOVE_POST = "post/REMOVE"
const RECEIVE_LIKE = "post/LIKE"


const receivePosts = posts => ({
    type: RECEIVE_POSTS,
    posts
});

const receivePost = post => ({
    type: RECEIVE_POST,
    post
});

const receiveUserPosts = posts => ({
    type: RECEIVE_USER_POSTS,
    posts
});

const removePost = payload => ({
    type: REMOVE_POST,
    payload
})

const receiveLike = payload => ({
    type: RECEIVE_LIKE,
    payload
})

export const getPosts = (state) => (
    state.posts ? Object.values(state.posts) : []
)

export const getPost = (postId) => (state) => (
    state.posts ? state.posts[postId] : null
)


export const receiveErrors = errors => ({
    type: RECEIVE_POST_ERRORS,
    errors
});

export const clearpostErrors = errors => ({
    type: CLEAR_POST_ERRORS,
    errors
});

export const fetchPosts = (areaId) => async dispatch => {
    try {
        const res = await jwtFetch (`/api/posts/area/${areaId}`);
        const posts = await res.json();
        console.log("res ----", res)
        console.log("posts ----", posts)
        dispatch(receivePosts(posts));
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            dispatch(receiveErrors(resBody.errors));
        }
    }
};

export const fetchPost = (postId) => async dispatch => {
    try {
        const res = await jwtFetch (`/api/posts/${postId}`);
        const post = await res.json();
        dispatch(receivePost(post));
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            dispatch(receiveErrors(resBody.errors));
        }
    }
};

export const fetchUserPosts = (userId) => async dispatch => {
    try {
        const res = await jwtFetch(`/api/posts/user/${userId}`);
        const posts = await res.json();
        dispatch(receiveUserPosts(posts));
    } catch(err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            return dispatch(receiveErrors(resBody.errors));
    }
    }
};

export const createPost = data => async dispatch => {
    try {
        const res = await jwtFetch('/api/posts/', {
            method: 'POST',
            body: JSON.stringify(data)
        });
        const post = await res.json();
        dispatch(receivePost(post));
    } catch(err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            return dispatch(receiveErrors(resBody.errors));
        }
    }
};

export const updatePost = post => async dispatch => {
    try {
        const res = await jwtFetch(`/api/posts/${post.id}`, {
            method: 'PUT',
            body: JSON.stringify(post)
        });
        const post = await res.json();
        dispatch(receivePost(post));
    } catch(err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            return dispatch(receiveErrors(resBody.errors));
        }
    }
};

export const deletePost = (postId) => async dispatch => {
    const response = await jwtFetch(`api/posts/${postId}`, {
        method: "DELETE"
    });
    if (response.ok) {
        dispatch(removePost(postId))
    }
}

export const likePost = (postId) => async dispatch => {
    const user = useSelector(state => state.currentUser)
    const response = await jwtFetch(`api/posts/${postId}/likes`, {
        method: "POST",
        body: JSON.stringify(user)
    })
    if (response.ok) {
        dispatch(receiveLike(postId))
    }
}

const nullErrors = null;

export const postErrorsReducer = (state = nullErrors, action) => {
    switch(action.type) {
        case RECEIVE_POST_ERRORS:
            return action.errors;
        case RECEIVE_POST:
        case CLEAR_POST_ERRORS:
            return nullErrors;
        default:
        return state;
    }
};

const postsReducer = (state = { all: {}, user: {} }, action) => {
    switch(action.type) {
        case RECEIVE_POSTS:
            return { ...state, all: action.posts };
        case RECEIVE_USER_POSTS:
            return { ...state, user: action.posts};
        case RECEIVE_POST:
            return { ...state, [action.post._id] : action.post};
        case REMOVE_POST: 
            return {};
        case RECEIVE_USER_LOGOUT:
            return { ...state, user: {} }
        default:
            return state;
    }
};

export default postsReducer;