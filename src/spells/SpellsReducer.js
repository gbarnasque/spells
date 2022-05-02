import _ from 'lodash';
import actionTypes from "../main/ActionTypes";

const INITIAL_STATE = {
    list: [],
    spell: {},
    redirect: false,
};


function SpellsReducer(state = INITIAL_STATE, action) {
    switch(action.type) {
        case actionTypes.SPELLS_FETCHED:
            if(action.payload !== null) {
                const spellsList = _.orderBy(action.payload, [s => s.name.toLowerCase()], 'asc')
                return { ...state, list: spellsList, redirect: false};
            }
            return INITIAL_STATE;
        
        case actionTypes.SPELL_VIEW:
            console.log(actionTypes.SPELL_VIEW, action.payload);
            if(action.payload !== null) {
                return {...state, spell: action.payload, redirect: false };
            }
            return {...state, redirect: true};
        case actionTypes.SPELL_CREATE:
            console.log(actionTypes.SPELL_CREATE, action.payload);
            if(action.payload !== null) {
                return {...state, spell: action.payload, redirect: true };
            }
            return {...state};
        case actionTypes.SPELL_EDIT:
            console.log(actionTypes.SPELL_EDIT, action.payload);
            if(action.payload !== null) {
                return {...state, spell: action.payload, redirect: true };
            }
            return {...state, redirect: true};
        case actionTypes.SPELL_DELETE:
            console.log(actionTypes.SPELL_DELETE, action.payload);
            if(action.payload !== null) {
                const spellsList = _.filter(state.list, (s) => s.id !== action.payload.id);
                return {...state, list: spellsList, spell: {}, redirect: false};
            }
            return {...state};

        default:
            return state;
    }
}

export default SpellsReducer;