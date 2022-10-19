import {connect} from "react-redux";
import Login from "./Login";
import {
    setAuthorize,
    Authorization,
    updateLoginValue,
    updatePasswordValue,
    updateErrorNotifi
} from "../../redux/LoginReducer";

let mapStateToProps = (state) => {
    return {
        isErrorNotifi: state.Login.isErrorNotifi,
        login: state.Login.login,
        pass: state.Login.pass,
        isAuthorize: state.Login.isAuthorize,
        requestToken: state.Login.requestToken,
    }
}

export default connect(mapStateToProps, {
    updateErrorNotifi,
    updateLoginValue,
    updatePasswordValue,
    setAuthorize,
    Authorization,
})(Login)