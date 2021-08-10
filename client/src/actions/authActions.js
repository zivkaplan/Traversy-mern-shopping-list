import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
} from './types';
import { returnErrors } from './errorActions';
import axios from 'axios';

//Check token & load user
export const loadUser = () => async (dispatch, getState) => {
    try {
        // user loading
        dispatch({ type: USER_LOADING });

        // set http req headers
        const config = {
            headers: {
                'Content-type': 'application/json',
            },
        };
        // get token from local storage & add to req headers if exists
        const token = getState().auth.token;
        if (token) config.headers['x-auth-token'] = token;

        const response = await axios.get('api/auth/user', config);
        dispatch({
            type: USER_LOADED,
            payload: response.data,
        });
    } catch (e) {
        dispatch(returnErrors(e.response.data, e.response.status));
        dispatch({
            type: AUTH_ERROR,
        });
    }
};
