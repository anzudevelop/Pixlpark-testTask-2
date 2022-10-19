import {applyMiddleware, combineReducers, createStore} from "redux";
import tableReducer from "./TableReducer";
import thunkMiddleware from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'
import loginReducer from "./LoginReducer";

let reducers = combineReducers({
    Table: tableReducer,
    Login: loginReducer,
    form: formReducer,
})

let store = createStore(reducers, applyMiddleware(thunkMiddleware))
//window.store = store

export default store