import actionTypes from "../main/ActionTypes";

const userKey = '_spells_user_logged';
const INITIAL_STATE = {
    username: localStorage.getItem(userKey),
    logged: false, 
    expiresAt: null
}

function getEpochTime() {
    return Math.floor(new Date().getTime() / 1000);
}

function isLoginExpired(expirationTime) {
    console.log(getEpochTime());
    return (getEpochTime() > expirationTime);
}

function LoginReducer(state = INITIAL_STATE, action) {
    switch(action.type) {
        case actionTypes.USER_LOGIN:
            if(action.payload.logged) {
                localStorage.setItem(userKey, JSON.stringify(action.payload));
                return { ...action.payload };
            } 
            localStorage.removeItem(userKey);
            return INITIAL_STATE;
        case actionTypes.IS_USER_LOGGED:
            const oldState = JSON.parse(localStorage.getItem(userKey));
            if(oldState !== null && !isLoginExpired(oldState.expiresAt)) {
                return oldState;
            }
            localStorage.removeItem(userKey);
            return INITIAL_STATE;
        default:
            return state;
    }
}

export default LoginReducer;