import { toastr } from 'react-redux-toastr';
import axios from 'axios';
import consts from '../consts';
import actionTypes from '../main/ActionTypes';


export function getSpells(values) {
    return submit(values, `${consts.API_URL}`);
}

export function editSpells(values) {
    return submit(values, `${consts.OAPI_URL}`);
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
                e.response.data.errors.forEach(error => toastr.error('Error', error));
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