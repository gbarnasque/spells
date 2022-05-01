import axios from 'axios';
import consts from '../consts';
import actionTypes from '../main/ActionTypes';
import { toast } from 'react-toastify';

const spellsURL = consts.API_URL + 'spells';
const INITIAL_VALUES = { list: [] };

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

export function editSpells(values) {
    //return submit(values, `${consts.OAPI_URL}`);
}