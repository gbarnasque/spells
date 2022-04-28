import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import App from './App';
import LoginForm from '../login/LoginForm';

class LoginOrApp extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
      
    }

    render() {
        console.log('login', this.props.login);
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
    return {login: state.login};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginOrApp);