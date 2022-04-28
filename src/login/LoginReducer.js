import actionTypes from "../main/ActionTypes";

const userKey = '_spells_user_logged';
const INITIAL_STATE = {
    username: JSON.parse(localStorage.getItem(userKey)),
    logged: false, 
}

function LoginReducer(state = INITIAL_STATE, action) {
    switch(action.type) {
        case actionTypes.USER_LOGIN:
            console.log('action', actionTypes.USER_LOGIN);
            console.log(action.payload);
            if(action.payload.logged) {
                localStorage.setItem(userKey, action.payload.username);
                return { ...state, logged: true, username: action.payload.username};
            } else {
                localStorage.removeItem(userKey);
                return { ...state, logged: false, username: null };
            }
        //case actionTypes.USER_LOGGED:
            
        default:
            return state;
    }
}

export default LoginReducer;