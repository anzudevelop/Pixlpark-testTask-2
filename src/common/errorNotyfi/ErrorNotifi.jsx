import React, {useState} from "react";
import s from "./ErrorNotifi.module.css"
import {clearErrorMsg} from "../../redux/TableReducer";

const ErrorNotifi = (props) => {

    setTimeout(() => {
        props.hideErrorNotifi()
    },3000)
    return (
        <div className={s.showErrorNotifi}>
            <div className={s.TextArea}>
                {props.notifi}
                <div className={s.textInfo}>
                    {props.text}
                </div>
            </div>
        </div>
    )
}

export default ErrorNotifi