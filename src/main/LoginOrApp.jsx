import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import App from './App';
import LoginForm from '../login/LoginForm';
import { checkIfLogged } from '../login/LoginActions';

class LoginOrApp extends React.Component {

    componentDidMount() {
        this.props.checkIfLogged();
    }

    render() {
        if(this.props.login.logged) {
            return (
                <App />
            )
        }
        else{
            return (
                <LoginForm />
            )
        }
    }
}

function mapStateToProps(state){
    return { login: state.login };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ checkIfLogged }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginOrApp);