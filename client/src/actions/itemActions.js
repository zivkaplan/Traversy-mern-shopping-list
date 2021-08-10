import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types';
import axios from 'axios';
import { tokenHeaderConfig } from './authActions';
import { returnErrors } from './errorActions';

export const getItems = () => async (dispatch) => {
    try {
        dispatch(setItemsLoading());
        const response = await axios.get('api/items');
        dispatch({
            type: GET_ITEMS,
            payload: response.data,
        });
    } catch (e) {
        dispatch(returnErrors(e.response.data, e.response.status));
    }
};

export const addItem = (item, getState) => async (dispatch) => {
    try {
        const response = await axios.post(
            'api/items',
            item,
            tokenHeaderConfig(getState)
        );
        dispatch({
            type: ADD_ITEM,
            payload: response.data,
        });
    } catch (e) {
        dispatch(returnErrors(e.response.data, e.response.status));
    }
};

export const deleteItem = (id) => async (dispatch, getState) => {
    try {
        await axios.delete(`/api/items/${id}`, tokenHeaderConfig(getState));
        dispatch({
            type: DELETE_ITEM,
            payload: id,
        });
    } catch (e) {
        dispatch(returnErrors(e.response.data, e.response.status));
    }
};

export const setItemsLoading = () => {
    return {
        type: ITEMS_LOADING,
    };
};
