import { authConstants } from "./constants";
import axios from 'axios';

export const isUserLoggedIn = () => {
    return async dispatch => {
        const res = await axios.get('/api/current_user');
        if (res.data) {
            const user = res.data;
            if (!localStorage.getItem('user')) {
                localStorage.setItem('user', JSON.stringify(user));
            }
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload: {
                    user
                }
            });
        } else {
            dispatch({
                type: authConstants.LOGIN_FAILURE,
                payload: { error: 'Failed to login' }
            });
        }
    }
}


export const signout = () => {
    return async dispatch => {
        dispatch({ type: authConstants.LOGOUT_REQUEST });
        const res = await axios.get('/api/logout');
        if (res.status === 200) {
            localStorage.clear();
            dispatch({ type: authConstants.LOGOUT_SUCCESS });
        } else {
            dispatch({
                type: authConstants.LOGOUT_FAILURE,
                payload: { error: res.data.error }
            });
        }
    }
}