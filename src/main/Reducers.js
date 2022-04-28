import { combineReducers } from 'redux';
import LoginReducer from '../login/LoginReducer';
import SpellsReducer from '../spells/SpellsReducer';

const rootReducer = combineReducers({
    login: LoginReducer,
    spells: SpellsReducer,
    
});

export default rootReducer;