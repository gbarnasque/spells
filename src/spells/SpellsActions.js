import axios from 'axios';
import consts from '../consts';
import actionTypes from '../main/ActionTypes';
import { toast } from 'react-toastify';

const spellsURL = consts.API_URL + 'spells';

export function getSpells() {
    const toastId = 'fetch_spells';
    return (dispatch) => {
        axios.get(spellsURL)
        .then(resp => {
            dispatch({type: actionTypes.SPELLS_FETCHED, payload: resp.data});
        })
        .catch(resp => {
            toast('Error trying to fetch spells. Please try again later.', {toastId: toastId, autoClose: 3000});
            dispatch({type: actionTypes.SPELLS_FETCHED, payload: null});
        });
    };
}

export function fetchSpellInfo(spell) {
    return manageSpell(spell, 'get', actionTypes.SPELL_VIEW, 'Spell fetched successfully', 'Error trying to fetch data of spell. Please try again later.'); 
}

export function createSpell(spell) {
    const toastIdSuccess = JSON.stringify(spell) + '_success';
    const toastIdError = JSON.stringify(spell) + '_error';
    return (dispatch) => {
        axios.post(spellsURL, spell)
        .then(resp => {
            toast.success('Spell created successfully', {toastId: toastIdSuccess, autoClose: 1500});
            dispatch({type: actionTypes.SPELL_CREATE, payload: resp.data});
        })
        .catch(resp => {
            toast.error('Error creating spell. Please try again later.', {toastId: toastIdError, autoClose: 3000});
            dispatch({type: actionTypes.SPELL_CREATE, payload: null});
        });
    };
}

export function editSpell(spell) {
    return manageSpell(spell, 'put', actionTypes.SPELL_EDIT, 'Spell edited successfully', 'Error editing spell. Please try again later.'); 
}

export function deleteSpell(spell) {
    return manageSpell(spell, 'delete', actionTypes.SPELL_DELETE, 'Spell deleted successfully', 'Error deleting spell. Please try again later.');
}

function manageSpell(spell, verb, typeAction, toastOnSuccessMessage, toastOnErrorMessage) {
    const toastIdSuccess = JSON.stringify(spell) + '_success';
    const toastIdError = JSON.stringify(spell) + '_error';
    return (dispatch) => {
        axios[verb](`${spellsURL}/${spell.id}`, spell)
        .then(resp => {
            toast.success(toastOnSuccessMessage, {toastId: toastIdSuccess, autoClose: 1500});
            dispatch({type: typeAction, payload: resp.data});
        })
        .catch(resp => {
            toast.error(toastOnErrorMessage, {toastId: toastIdError, autoClose: 3000});
            dispatch({type: typeAction, payload: null});
        });
    };
}