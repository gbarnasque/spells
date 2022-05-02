import axios from 'axios';
import consts from '../consts';
import actionTypes from '../main/ActionTypes';
import { toast } from 'react-toastify';

import { MemoryRouter } from 'react-router';

const spellsURL = consts.MY_API_URL + 'spells';
const INITIAL_VALUES = { list: [], spell: {} };

export function getSpells() {
    return (dispatch) => {
        axios.get(spellsURL)
        .then(resp => {
            dispatch({type: actionTypes.SPELLS_FETCHED, payload: resp.data});
        })
        .catch(resp => {
            toast('Error trying to fetch spells. Please try again later.');
            dispatch({type: actionTypes.SPELLS_FETCHED, payload: null});
        });
    };
}

export function fetchSpellInfo(spell) {
    return manageSpell(spell, 'get', actionTypes.SPELL_VIEW, 'Spell fetched successfully', 'Error trying to fetch data of spell. Please try again later.'); 
    // return (dispatch) => {
    //     axios.get(`${spellsURL}/${id}`)
    //     .then(resp => {
    //         //console.log('Spell fetch', resp.data);
    //         dispatch({type: actionTypes.SPELL_VIEW, payload: resp.data});
    //     })
    //     .catch(resp => {
    //         console.log('resp Error', resp);
    //         toast('Error trying to fetch data of spell. Please try again later.');
    //         dispatch({type: actionTypes.SPELL_VIEW, payload: null});
    //     });
    // };
}

export function createSpell(spell) {
    const toastIdSuccess = JSON.stringify(spell) + '_success';
    const toastIdError = JSON.stringify(spell) + '_error';
    console.log('entered create Spell', spell);
    return (dispatch) => {
        axios.post(spellsURL, spell)
        .then(resp => {
            //console.log('Spell fetch', resp.data);
            toast('Spell created successfully', {toastId: toastIdSuccess});
            dispatch({type: actionTypes.SPELL_CREATE, payload: resp.data});
        })
        .catch(resp => {
            console.log('resp Error', resp);
            toast('Error creating spell. Please try again later.', {toastId: toastIdError});
            dispatch({type: actionTypes.SPELL_CREATE, payload: null});
        });
    };
}

export function editSpell(spell) {
    console.log('entered edit Spell', spell);
    return manageSpell(spell, 'put', actionTypes.SPELL_EDIT, 'Spell edited successfully', 'Error editing spell. Please try again later.'); 
    // return (dispatch) => {
    //     axios.put(`${spellsURL}/${spell.id}`)
    //     .then(resp => {
    //         //console.log('Spell fetch', resp.data);
    //         dispatch({type: actionTypes.SPELL_EDIT, payload: resp.data});
    //     })
    //     .catch(resp => {
    //         console.log('resp Error', resp);
    //         toast('Error updating spell. Please try again later.');
    //         dispatch({type: actionTypes.SPELL_EDIT, payload: null});
    //     });
    // };
}

export function deleteSpell(spell) {
    console.log('entered delete Spell', spell);
    return manageSpell(spell, 'delete', actionTypes.SPELL_DELETE, 'Spell deleted successfully', 'Error deleting spell. Please try again later.');
    // return (dispatch) => {
    //     axios.delete(`${spellsURL}/${spell.id}`)
    //     .then(resp => {
    //         //console.log('Spell fetch', resp.data);
    //         dispatch({type: actionTypes.SPELL_DELETE, payload: resp.data});
    //     })
    //     .catch(resp => {
    //         console.log('resp Error', resp);
    //         toast('Error deleting spell. Please try again later.');
    //         dispatch({type: actionTypes.SPELL_DELETE, payload: null});
    //     });
    // };
}

function manageSpell(spell, verb, typeAction, toastOnSuccessMessage, toastOnErrorMessage) {
    const toastIdSuccess = JSON.stringify(spell) + '_success';
    const toastIdError = JSON.stringify(spell) + '_error';
    console.log('entered manage spell');
    return (dispatch) => {
        axios[verb](`${spellsURL}/${spell.id}`, spell)
        .then(resp => {
            console.log('resp Success', resp.data);
            toast(toastOnSuccessMessage, {toastId: toastIdSuccess});
            dispatch({type: typeAction, payload: resp.data});
        })
        .catch(resp => {
            console.log('resp Error', resp);
            toast(toastOnErrorMessage, {toastId: toastIdError});
            dispatch({type: typeAction, payload: null});
        });
    };
}