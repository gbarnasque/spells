import { toast } from 'react-toastify';
import consts from '../consts';
import actionTypes from '../main/ActionTypes';

function getEpochTime() {
    return Math.floor(new Date().getTime() / 1000);
}

export function login(user) {
    console.log('entrou no login', user);
    let payload = {
        username: user.username,
        expiresAt: getEpochTime() + consts.LOGIN_EXPIRATION_TIME,
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

export function checkIfLogged() {
    return { type: actionTypes.IS_USER_LOGGED, payload: null};
}

export function logout() {
    const payload = {
        username: null,
        logged: false,
    }
    return { type: actionTypes.USER_LOGIN, payload: payload };
}