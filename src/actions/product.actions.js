import axios from 'axios';
import { productConstants } from './constants';

export const getProducts = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: productConstants.GET_ALL_PRODUCTS_REQUEST });
      const res = await axios.post(`api/product/get`);
      if (res.status === 200) {
        const { products } = res.data;
        //   console.log(products);
        dispatch({
          type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
          payload: { products },
        });
      } else {
        dispatch({ type: productConstants.GET_ALL_PRODUCTS_FAILURE });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const addProduct = (form) => {
  return async (dispatch) => {
    try {
      dispatch({ type: productConstants.ADD_PRODUCT_REQUEST });
      const res = await axios.post(`api/product/create`, form);
      // console.log(res.status);
      if (res.status === 201) {
        dispatch({ type: productConstants.ADD_PRODUCT_SUCCESS });
        dispatch(getProducts());
      } else {
        dispatch({ type: productConstants.ADD_PRODUCT_FAILURE });
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export const deleteProductById = (payload) => {
  return async (dispatch) => {
    try {
      const res = await axios.delete(`api/product/deleteProductById`, {
        data: { payload }
      });
      dispatch({ type: productConstants.DELETE_PRODUCT_BY_ID_REQUEST });
      if (res.status === 202) {
        dispatch({ type: productConstants.DELETE_PRODUCT_BY_ID_SUCCESS });
        dispatch(getProducts());
      } else {
        const { error } = res.data;
        dispatch({
          type: productConstants.DELETE_PRODUCT_BY_ID_FAILURE,
          payload: {
            error,
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
}