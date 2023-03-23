import jwtFetch from './jwt';
import { RECEIVE_USER_LOGOUT } from './session';
import { getCurrentUser } from './session';
import { useSelector } from 'react-redux';

const RECEIVE_POSTS = "posts/RECEIVE_POSTS";
const RECEIVE_POST = "posts/RECEIVE_POST"
const RECEIVE_USER_POSTS = "posts/RECEIVE_USER_POSTS";
const RECEIVE_POST_ERRORS = "posts/RECEIVE_POST_ERRORS";
const CLEAR_POST_ERRORS = "posts/CLEAR_POST_ERRORS";
const RECEIVE_POST_MAX_LIKE_GROUP_BY_REGION = "posts/RECEIVE_POST_MAX_LIKE_GROUP_BY_REGION";
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

const receiveLike = post => ({
    type: RECEIVE_LIKE,
    post
})

const receivePostsMaxLikeGroupByRegion = area => ({
    type: RECEIVE_POST_MAX_LIKE_GROUP_BY_REGION,
    area
})

export const getPosts = (state) => (
    // Object.values(state.posts).length > 0 ? Object.values(state.posts) : []
    state.posts ? Object.values(state.posts) : []

)

export const getPost = (postId) => (state) => (
    state.posts ? state.posts[postId] : null
)

export const getPostLike = (postId) => (state) => {
    return state.posts ? state.posts[postId]?.likes : null
}

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
        // console.log("res ----", res)
        // console.log("posts ----", posts)
        dispatch(receivePosts(posts));
    } catch (err) {
        if (err.statusCode === 400) {
            dispatch(receiveErrors(err.errors));
        }
    }
};

export const fetchPost = (postId) => async dispatch => {
    try {
        const res = await jwtFetch (`/api/posts/${postId}`);
        const post = await res.json();
        dispatch(receivePost(post));
    } catch (err) {
        if (err.statusCode === 400) {
            dispatch(receiveErrors(err.errors));
        }
    }
};

export const fetchUserPosts = () => async dispatch => {
    try {
        const res = await jwtFetch(`/api/posts/user`);
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

export const updatePost = oldpost => async dispatch => {
    try {
        const res = await jwtFetch(`/api/posts/${oldpost._id}`, {
            method: 'PUT',
            body: JSON.stringify(oldpost)
        });
        const updatedPost = await res.json();
        dispatch(receivePost(updatedPost));
    } catch(err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            return dispatch(receiveErrors(resBody.errors));
        }
    }
};

export const deletePost = (postId) => async dispatch => {
    const response = await jwtFetch(`/api/posts/${postId}`, {
        method: "DELETE"
    });
    if (response.ok) {
        dispatch(removePost(postId))
    }
}

export const likePost = (post) => async dispatch => {
    const response = await jwtFetch(`/api/posts/${post._id}/likes`, {
        method: "POST"
    })
    if (response.ok) {
        const p = await response.json();
        dispatch(receiveLike(p))
    }
}

export const maxLikePostGroupByRegion = () => async dispatch => {
    const response = await jwtFetch('/api/posts/likes')
    if (response.ok) {
        const res  = await response.json();
        dispatch(receivePostsMaxLikeGroupByRegion(res));
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

const postsReducer = (state = {}, action) => {
    // debugger
    let newState = {...state}
    switch(action.type) {
        case RECEIVE_POSTS:
            // console.log('posts from reducer', action.posts)
            // // const newState = {...state};
            // console.log('all', all)
            // const {all} = newState
            // for(let post of action.posts){
            //     all[post._id] = post
            // }
            return action.posts;
        case RECEIVE_USER_POSTS:
            return action.posts;
        case RECEIVE_POST:
            return { ...state, [action.post._id] : action.post};
        case REMOVE_POST: 
            return {};
        case RECEIVE_USER_LOGOUT:
            return { ...state, user: {} }
        case RECEIVE_POST_MAX_LIKE_GROUP_BY_REGION:
        case RECEIVE_LIKE:
            return { ...state, [action.post._id] : action.post};
        default:
            return state;
    }
};

export default postsReducer;