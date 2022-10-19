import {dataAPI} from "../api/api";

const SET_TABLE_DATA = 'SET_TABLE_DATA'
const SET_ERROR_NOTIFI = 'SET_ERROR_NOTIFI'
const UPDATE_ERROR_MSG = 'UPDATE_ERROR_MSG'

let initialState = {
    Data: [],
    isErrorNotifi: false,
    errorMsg: {notifi: '', text: ''},
}

const tableReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ERROR_NOTIFI: {
            return {
                ...state,
                isErrorNotifi: action.value,
            }
        }
        case UPDATE_ERROR_MSG: {
            return {
                ...state,
                errorMsg: action.data
            }
        }
        case SET_TABLE_DATA: {
            return {
                ...state,
                Data: action.data
            }
        }
        default:
            return state
    }
}

const updateErrorNotifiAC = (value) => ({type: SET_ERROR_NOTIFI, value})
const updateErrorMsgAC = (data) => ({type: UPDATE_ERROR_MSG, data})
const setDataAC = (data) => ({type: SET_TABLE_DATA, data})


export const hideErrorNotifi = () => {
    return (dispatch) => {
        dispatch(updateErrorNotifiAC(false))
    }
}

export const getOrdersData = (filterValues, accessToken) => {
    return (dispatch) => {
        dataAPI.getOrders(filterValues, accessToken).then(data => {
            if(data.length <= 0) {
                dispatch(updateErrorNotifiAC(true))
                dispatch(updateErrorMsgAC({notifi: 'Ошибка', text: 'Не найдено записей по введенным парамертрам'}))
            }
            dispatch(setDataAC(data))
        })
    }
}

export default tableReducer