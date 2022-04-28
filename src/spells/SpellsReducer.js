import actionTypes from "../main/ActionTypes";

const INITIAL_STATE = {
    list: []
}

function SpellsReducer(state = INITIAL_STATE, action) {
    switch(action.type) {
        case actionTypes.SPELLS_FETCHED:
                return { ...state, list: action.payload};
        default:
            return state;
    }
}

export default SpellsReducer;