import {
    categoryConstants, 
    productConstants,
    brandConstants,
    orderConstants,
    sizeConstants,
    userConstants
  } from "./constants";

import axios from '../helpers/axios';

export const getInitData = () =>{
    return async (dispatch) => {
        const res = await axios.post(`/initData`);
        if( res.status === 200){
            const { categories , products , brands, orders, sizes , users } = res.data;
            dispatch({
                type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
                payload: { categories },
            });
            dispatch({
                type: brandConstants.GET_ALL_BRANDS_SUCCESS,
                payload: { brands }
            });
            dispatch({
                type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
                payload: { products }
            });
            dispatch({
                type: orderConstants.GET_CUSTOMER_ORDER_SUCCESS,
                payload: { orders }
            });
            dispatch({
                type: sizeConstants.GET_ALL_SIZE_SUCCESS,
                payload: { sizes }
            })
            dispatch({
                type: userConstants.GET_ALL_USER_SUCCESS,
                payload: { users }
            })
        }   
    };
};