import { combineReducers } from 'redux';
import LoginReducer from '../login/LoginReducer';
import SpellsReducer from '../spells/SpellsReducer';
import SpinnerReducer from '../common/SpinnerReducer';

const rootReducer = combineReducers({
    login: LoginReducer,
    spells: SpellsReducer,
    spinner: SpinnerReducer,
});

export default rootReducer;