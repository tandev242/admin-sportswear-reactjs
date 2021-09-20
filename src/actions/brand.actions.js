import axios from "../helpers/axios";
import { brandConstants } from "./constants";

export const getAllBrand = () => {
    return async dispatch => {
        dispatch({ type: brandConstants.GET_ALL_BRANDS_REQUEST });
        const res = await axios.get(`/brand/getBrands`);
        if (res.status === 200) {
            const { brands } = res.data;
            dispatch({
                type: brandConstants.GET_ALL_BRANDS_SUCCESS,
                payload: { brands }
            });
        } else {
            dispatch({
                type: brandConstants.GET_ALL_BRANDS_FAILURE,
                payload: { error: res.data.error }
            });
        }
    }
};


export const deleteBrands = (ids) => {
    return async dispatch => {
        dispatch({ type: brandConstants.DELETE_BRANDS_REQUEST })
        const res = await axios.post(`/brand/deleteBrands`, { payload: { ids } });
        if (res.status === 201) {
            dispatch({ type: brandConstants.DELETE_BRANDS_SUCCESS });
            dispatch(getAllBrand());
        } else {
            const { error } = res.data;
            dispatch({
                type: brandConstants.DELETE_BRANDS_FAILURE,
                payload: { error }
            });
        }
    }
}

export const updateBrands = (brands) => {
    return async dispatch => {
        dispatch({ type: brandConstants.UPDATE_BRANDS_REQUEST })
        const res = await axios.post(`/brand/updateBrands`, { brands });
        if (res.status === 202) {
            dispatch({ type: brandConstants.UPDATE_BRANDS_SUCCESS});
            dispatch(getAllBrand());
        } else {
            const { error } = res.data;
            dispatch({
                type: brandConstants.UPDATE_BRANDS_FAILURE,
                payload: { error }
            });
        }
    }
}

export const addBrand = (form) => {
    return async dispatch => {
        dispatch({ type: brandConstants.ADD_NEW_BRAND_REQUEST })
        const res = await axios.post(`/brand/add`, form);
        if (res.status === 201) {
            dispatch({ type: brandConstants.ADD_NEW_BRAND_SUCCESS });
            dispatch(getAllBrand());
        } else {
            const { error } = res.data;
            dispatch({
                type: brandConstants.ADD_NEW_BRAND_FAILURE,
                payload: { error }
            });
        }
    }
}
