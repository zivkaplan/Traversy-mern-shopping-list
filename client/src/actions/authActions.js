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

// setup config/headers and token
export const tokenHeaderConfig = (getState) => {
    // set http req headers
    const config = {
        headers: {
            'Content-type': 'application/json',
        },
    };

    // get token from local storage & add to req headers if exists
    const token = getState().auth.token;
    if (token) config.headers['x-auth-token'] = token;
    return config;
};

//Check token & load user
export const loadUser = () => async (dispatch, getState) => {
    try {
        // user loading
        dispatch({ type: USER_LOADING });

        const response = await axios.get(
            '/api/auth/user',
            tokenHeaderConfig(getState)
        );
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

//register user
export const register =
    ({ name, email, password }) =>
    async (dispatch) => {
        try {
            const response = await axios({
                method: 'post',
                url: '/api/users',
                headers: { 'Content-Type': 'application/json' },
                data: JSON.stringify({ name, email, password }),
            });
            dispatch({
                type: REGISTER_SUCCESS,
                payload: response.data,
            });
        } catch (e) {
            dispatch(
                returnErrors(
                    e.response.data,
                    e.response.status,
                    'REGISTER_FAIL'
                )
            );
            dispatch({
                type: REGISTER_FAIL,
            });
        }
    };

export const login =
    ({ email, password }) =>
    async (dispatch) => {
        try {
            const response = await axios({
                method: 'post',
                url: '/api/auth',
                headers: { 'Content-Type': 'application/json' },
                data: JSON.stringify({ email, password }),
            });
            dispatch({
                type: LOGIN_SUCCESS,
                payload: response.data,
            });
        } catch (e) {
            dispatch(
                returnErrors(e.response.data, e.response.status, 'LOGIN_FAIL')
            );
            dispatch({
                type: LOGIN_FAIL,
            });
        }
    };

export const logout = () => {
    return {
        type: LOGOUT_SUCCESS,
    };
};
