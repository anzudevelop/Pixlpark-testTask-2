import {dataAPI} from "../api/api";

const SET_ERROR = 'SET_ERROR'
const UPDATE_LOGIN_VALUE = 'UPDATE_LOGIN_VALUE'
const UPDATE_PASSWORD_VALUE = 'UPDATE_PASSWORD_VALUE'
const SET_AUTHORIZATION = 'SET_AUTHORIZATION'
const SET_REQUEST_TOKEN = 'SET_REQUEST_TOKEN'
const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN'

let initialState = {
    isErrorNotifi: false,
    login: '',
    pass: '',
    isAuthorize: false,
    requestToken: '',
    accessToken: '',
}

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ERROR: {
            return {
                ...state,
                isErrorNotifi: action.value,
                login: '',
                pass: '',
            }
        }
        case UPDATE_LOGIN_VALUE: {
            return {
                ...state,
                login: action.value,
            }
        }
        case UPDATE_PASSWORD_VALUE: {
            return {
                ...state,
                pass: action.value,
            }
        }
        case SET_AUTHORIZATION: {
            return {
                ...state,
                isAuthorize: true,
            }
        }
        case SET_REQUEST_TOKEN: {
            return {
                ...state,
                requestToken: action.value,
            }
        }
        case SET_ACCESS_TOKEN: {
            return {
                ...state,
                accessToken: action.value,
            }
        }
        default:
            return state
    }
}

const updateErrorNotifiAC = (value) => ({type: SET_ERROR, value})
const updateLoginValueActionCreator = (value) => ({type: UPDATE_LOGIN_VALUE, value})
const updatePasswordValueActionCreator = (value) => ({type: UPDATE_PASSWORD_VALUE, value})
const setAuthorizeAC = () => ({type: SET_AUTHORIZATION})
const setRequestTokenAC = (value) => ({type: SET_REQUEST_TOKEN, value})
const setAccessTokenAC = (value) => ({type: SET_ACCESS_TOKEN, value})

export const updateErrorNotifi = (value) => {
    return (dispatch) => {
        dispatch(updateLoginValueActionCreator(value))
    }
}
export const updateLoginValue = (value) => {
    return (dispatch) => {
        dispatch(updateLoginValueActionCreator(value))
    }
}
export const updatePasswordValue = (value) => {
    return (dispatch) => {
        dispatch(updatePasswordValueActionCreator(value))
    }
}
export const setAuthorize = () => {
    return (dispatch) => {
        dispatch(setAuthorizeAC())
    }
}
export const setAccessToken = (token) => {
    return (dispatch) => {
        dispatch(setAccessTokenAC(token))
    }
}
export const Authorization = (token, login, pass) => {
    return (dispatch) => {
        dispatch(updateErrorNotifiAC(false))
        dispatch(setRequestTokenAC(token))
        dataAPI.getAccessToken(token, login, pass).then(data => {
            if (data) {
                dispatch(setAccessTokenAC(data))
                dispatch(setAuthorizeAC())
            } else {
                dispatch(updateErrorNotifiAC(true))
            }
        })
    }
}



export default loginReducer