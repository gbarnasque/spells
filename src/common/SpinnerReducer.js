import actionTypes from "../main/ActionTypes";

const INITIAL_STATE = {
    show: false,
}

function SpinnerReducer(state = INITIAL_STATE, action) {
    switch(action.type){
        case actionTypes.SPINNER_SHOW:
        case actionTypes.SPINNER_HIDE:
            return {show:action.payload};
        default:
            return state;
    }
}

export default SpinnerReducer;