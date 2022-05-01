import actionTypes from "../main/ActionTypes";

const INITIAL_STATE = {
    list: [],
}

function SpellsReducer(state = INITIAL_STATE, action) {
    switch(action.type) {
        case actionTypes.SPELLS_FETCHED:
            if(action.payload !== null) 
                return { ...state, list: action.payload};
            return INITIAL_STATE;
        default:
            return state;
    }
}

export default SpellsReducer;