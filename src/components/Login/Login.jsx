import React, {useEffect, useState} from 'react';
import s from "./Login.module.css"

import {Link, Redirect, useNavigate} from "react-router-dom";
import {dataAPI} from "../../api/api";
import {setRequestToken, updateErrorNotifi} from "../../redux/LoginReducer";

const Login = (props) => {

    const navigate = useNavigate();

    let newLoginElement = React.createRef()
    let newPasswordElement = React.createRef()

    let onLoginChange = () => {
        props.updateLoginValue(newLoginElement.current.value)
    }

    let onPasswordChange = () => {
        props.updatePasswordValue(newPasswordElement.current.value)
    }

    let onLoginBtnClick = () => {
        const {login, pass, updateErrorNotifi} = props
        updateErrorNotifi(false)
        if (login.length <= 0 || pass.length <= 0) {
            updateErrorNotifi(true)
            return
        }
        dataAPI.getRequestToken().then(data => {
            if(data) {
                props.Authorization(data, login, pass)
            } else {
                updateErrorNotifi(true)
            }
        })
    }

    const checkAuthorization = () => {
        if(props.isAuthorize) {
            navigate("/table")
        }
    }
    checkAuthorization()

    return (
        <div>
            <div className={ s.background }>
                <div className={ s.shape }></div>
                <div className={ s.shape }></div>
            </div>
            <div className={s.form}>
                <h3>Orders List</h3>
                <label htmlFor="username">Username</label>
                <input onChange={ onLoginChange } ref={ newLoginElement } value={props.login} type="text" placeholder="Login" id="username"/>
                <label htmlFor="password">Password</label>
                <input onChange={ onPasswordChange } ref={ newPasswordElement } value={props.pass} type="password" placeholder="Password" id="password"/>
                <button onClick={ onLoginBtnClick }>Log in</button>
                <div className={props.isErrorNotifi ? s.showErrorMsg : s.hideErrorMsg}>Неверный логин или пароль</div>
            </div>

        </div>
    )
}

export default Login