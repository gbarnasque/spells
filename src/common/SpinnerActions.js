import actionTypes from '../main/ActionTypes';

export function showSpinner(show) {
    return { type: actionTypes.SPINNER_SHOW, payload: show };
}

export function hideSpinner() {
    return { type: actionTypes.SPINNER_HIDE, payload: false };
}