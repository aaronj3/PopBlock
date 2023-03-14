import {RECEIVE_CURRENT_USER} from './session'

const SHOW_LOGIN_MODAL = 'ui/SHOW_LOGIN_MODAL'
const SHOW_SIGNUP_MODAL = 'ui/SHOW_SIGNUP_MODAL'
const HIDE_MODAL = 'ui/HIDE_MODAL'

export const showLoginModal = () => {
    return{ type: SHOW_LOGIN_MODAL}
}

export const showSignupModal = () => {
    return{ type: SHOW_SIGNUP_MODAL}
}

export const hideModal = () => {
    return{ type: HIDE_MODAL}
}

const uiReducer = (state ={}, action) => {
    switch(action.type){
    case SHOW_LOGIN_MODAL:
        return {modal: 'login'}
    case SHOW_SIGNUP_MODAL:
        return {modal:'signup'}
    case HIDE_MODAL:
        return {modal: null}
    case RECEIVE_CURRENT_USER:
        return {modal: null}
    default:
        return state
    }
}

export default uiReducer
