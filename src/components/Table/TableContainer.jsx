import {connect} from "react-redux";
import {
    getOrdersData,
    hideErrorNotifi
} from "../../redux/TableReducer";
import Table from "./Table";

let mapStateToProps = (state) => {
    return {
        isAuthorize: state.Login.isAuthorize,
        accessToken: state.Login.accessToken,

        isFetching: state.Table.isFetching,
        isErrorNotifi: state.Table.isErrorNotifi,
        errorMsg: state.Table.errorMsg,
        Data: state.Table.Data,
    }
}

export default connect(mapStateToProps, {
    hideErrorNotifi,
    getOrdersData,
})(Table)
