import axios from 'axios';
import { toast } from 'react-toastify';
import consts from '../consts';
import actionTypes from '../main/ActionTypes';

export function login(user) {
    console.log('entrou no login', user);
    let payload = {
        username: user.username,
        logged: true,
    };
    const toastId = 'invalid-credentials';
    if(user.username !== consts.LOGIN_USER || user.password !== consts.LOGIN_PASSWORD) {
        console.log('toast', toastId);
        toast('Invalid credentials. Please try again.', {toastId: toastId});
        payload.logged = false;
    }

    return {type: actionTypes.USER_LOGIN, payload: payload};
}

export function signup(values) {
    return submit(values, `${consts.OAPI_URL}/signup`);
}

function submit(values, url) {
    return (dispatch) => {
        axios.post(url, values)
            .then(resp => {
                dispatch([
                    { type: actionTypes.USER_FETCHED, payload: resp.data}
                ]);
            })
            .catch(e => {
                e.response.data.errors.forEach(error => toast('Error', error));
            });
    } 
}

export function logout() {
    return { type: actionTypes.TOKEN_VALIDATED, payload: false };
}

export function validateToken(token) {
    return (dispatch) => {
        if(token) {
            axios.post(`${consts.OAPI_URL}/validateToken`, {token})
                .then(resp => {
                    dispatch({type: actionTypes.TOKEN_VALIDATED, payload: resp.data.valid});
                })
                .catch(e => dispatch({type: actionTypes.TOKEN_VALIDATED, payload: false}));
        } else {
            dispatch({type: actionTypes.TOKEN_VALIDATED, payload: false});
        }
    }
}