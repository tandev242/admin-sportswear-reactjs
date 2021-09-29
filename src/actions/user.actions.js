import axios from '../helpers/axios';
import { userConstants } from './constants';

export const updateUser = (user) => {
    return async (dispatch) => {
        try {
            dispatch({ type: userConstants.UPDATE_USER_REQUEST });
            const res = await axios.post(`/user/update`, { user });
            if (res.status === 202) {
                dispatch({ type: userConstants.UPDATE_USER_SUCCESS });
                dispatch(getUsers())
            } else {
                const { error } = res.data;
                dispatch({ type: userConstants.UPDATE_USER_FAILURE, payload: { error } });
            }
        } catch (error) {
            console.log(error);
        }
    };
};

export const getUsers = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: userConstants.GET_ALL_USER_REQUEST });
            const res = await axios.post(`/user/getUsers`);
            if (res.status === 200) {
                const { users } = res.data;
                dispatch({ type: userConstants.GET_ALL_USER_SUCCESS, payload: { users } });
            } else {
                const { error } = res.data;
                dispatch({ type: userConstants.GET_ALL_USER_FAILURE, payload: { error } });
            }
        } catch (error) {
            console.log(error);
        }
    };
};


export const deleteUserById = (payload) => {
    return async (dispatch) => {
        try {
            dispatch({ type: userConstants.DELETE_USER_REQUEST });
            const res = await axios.post(`/user/delete`, { payload });
            if (res.status === 204) {
                dispatch({ type: userConstants.DELETE_USER_SUCCESS });
                dispatch(getUsers())
            } else {
                const { error } = res.data;
                dispatch({ type: userConstants.DELETE_USER_FAILURE, payload: { error } });
            }
        } catch (error) {
            console.log(error);
        }
    };
};