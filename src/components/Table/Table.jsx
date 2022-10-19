import React from "react";
import f from "./Filter.module.css"
import s from "./Table.module.css"
import p from "./Info.module.css"
import ErrorNotifi from "../../common/errorNotyfi/ErrorNotifi";
import {Field, reduxForm} from "redux-form";


const TableForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className={f.filterWindow}>
                <div className={f.grid}>

                    <div className={f.filters}>
                        <div className={f.param}>
                            <div className={f.label}>
                                <p>Кол-во возвращаемых заказов</p>
                            </div>
                            <Field className={f.input} component={'input'} name={'take'} placeholder={'take'} type={'number'}/>
                        </div>
                        <div className={f.param}>
                            <div className={f.label}>
                                <p>Вернуть заказы начиная с</p>
                            </div>
                            <Field className={f.input} component={'input'} name={'skip'} placeholder={'skip'} type={'number'}/>
                        </div>
                        <div className={f.param}>
                            <div className={f.label}>
                                <p>Статус заказа</p>
                            </div>
                            <Field className={f.select} component={'select'} name={'status'}>
                                <option value="">Статус</option>
                                <option value="NotProcessed">Not Processed</option>
                                <option value="AwaitingPayment">Awaiting Payment</option>
                                <option value="ReadyToProcessing">Ready To Processing</option>
                                <option value="DesignCoordination">Design Coordination</option>
                                <option value="DesignCoordinationComplete">Design Coordination Complete</option>
                                <option value="DesignCoordinationAwaitingReply">Design Coordination Awaiting Reply</option>
                                <option value="PrepressCoordinationComplete">Prepress Coordination Complete</option>
                                <option value="PrepressCoordinationAwaitingReply">Prepress Coordination Awaiting Reply</option>
                                <option value="Printing">Printing</option>
                                <option value="PrintedWithDefect">Printed With Defect</option>
                                <option value="Printed">Printed</option>
                                <option value="Shipped">Shipped</option>
                                <option value="ShippedToStorage">Shipped To Storage</option>
                                <option value="Returned">Returned</option>
                                <option value="Cancelled">Cancelled</option>
                                <option value="CancelledWithDefect">Cancelled With Defect</option>
                                <option value="Refused">Refused</option>
                                <option value="Delivered">Delivered</option>
                            </Field>
                        </div>
                    </div>

                    <div className={f.filters}>
                        <div className={f.param}>
                            <div className={f.label}>
                                <p>ID пользователя</p>
                            </div>
                            <Field className={f.input} component={'input'} name={'userId'} placeholder={'userId'} type={'number'}/>
                        </div>
                        <div className={f.param}>
                            <div className={f.label}>
                                <p>ID заказа</p>
                            </div>
                            <Field className={f.input} component={'input'} name={'shippingId'} placeholder={'shippingId'} type={'number'}/>
                        </div>
                        <div className={f.param}>
                            <a>
                                <button className={f.button}>Найти</button>
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </form>
    )
}

const TableReduxForm = reduxForm({form: 'table'})(TableForm)

const Table = (props) => {

    const searchOrder = (filterValues) => {
        props.getOrdersData(filterValues, props.accessToken)
    }
    return (
        <div>
            <div>
                {!props.isAuthorize ? null :
                    <div className={f.content}>
                        <TableReduxForm onSubmit={searchOrder}/>
                        {
                            props.isErrorNotifi ? <ErrorNotifi notifi={props.errorMsg.notifi} text={props.errorMsg.text} hideErrorNotifi={props.hideErrorNotifi}/> :
                                !!props.Data.length ?
                                    <div>
                                        <table className={s.table}>
                                            <thead>
                                            <tr>
                                                <th>Дата создания</th>
                                                <th>Наименование</th>
                                                <th>ID покупателя</th>
                                                <th>PhotolabId</th>
                                                <th>Cтатус</th>
                                                <th>Стоимость</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                props.Data.map((el) => {
                                                    let date = new Date()
                                                    date.setSeconds(el.DateCreated.slice(6,-2))
                                                    let result = date.toString().slice(4, -21).replace('T', ' ')
                                                    return (
                                                        <tr>
                                                            <td>{result}</td>
                                                            <td>{el.Title}</td>
                                                            <td>{el.UserId}</td>
                                                            <td>{el.PhotolabId}</td>
                                                            <td>{el.Status}</td>
                                                            <td>{el.TotalPrice}</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                            </tbody>
                                        </table>
                                    </div>
                                    :
                                    null
                        }
                    </div>
                }

            </div>
        </div>
    )
}

export default Table