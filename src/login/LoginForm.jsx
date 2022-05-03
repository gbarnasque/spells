import React from 'react';
import { toast } from 'react-toastify';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { login } from './LoginActions';
import { showSpinner } from '../common/SpinnerActions';
import './LoginForm.css';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        }
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
       
    }

    handleUsernameChange = (event) => this.setState({username: event.target.value});
    handlePasswordChange = (event) => this.setState({password: event.target.value});

    handleSubmit(event) {
        event.preventDefault();
        if(this.state.username === '') {
            const toastId = 'invalid-username';
            toast.info('Please provide a valid username.', {toastId: toastId, autoClose: 2000});
            return;
        }
        if(this.state.password === '') {
            const toastId = 'invalid-password';
            toast.info('Please provide a valid password.', {toastId: toastId, autoClose: 2000});
            return;
        }
        this.props.login(this.state);
    }

    render() {
        return (
            <Row className='row-login-form'>
                <Col md='8' lg='6' xl='6' className='mx-md-auto'>
                    <Form onSubmit={this.handleSubmit} className='login-form'>
                        <fieldset>
                            <legend>Login</legend>
                            <Form.Group className='mb-3' controlId='formUsername'>
                                <Form.Label>Username<span className='color-red'>*</span>:</Form.Label>
                                <Form.Control
                                    className='form-control'
                                    placeholder='username'
                                    type='text'
                                    value={this.state.username}
                                    onChange={this.handleUsernameChange}/>
                            </Form.Group>
                            <Form.Group className='mb-3' controlId='formPassword'>
                                <Form.Label>Password<span className='color-red'>*</span>:</Form.Label>
                                <Form.Control
                                    className='form-control'
                                    placeholder='password'
                                    type='password'
                                    value={this.state.password}
                                    onChange={this.handlePasswordChange}/>
                            </Form.Group>
                            <Button type="submit" className="btn btn-minimalist float-end">Submit</Button>
                        </fieldset>
                    </Form>
                </Col>
            </Row>
        )
    }
}

function mapStateToProps(state) {
    return {
       
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({login, showSpinner}, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);