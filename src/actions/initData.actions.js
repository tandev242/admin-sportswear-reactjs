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
            await dispatch({
                type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
                payload: { categories },
            });
            await dispatch({
                type: brandConstants.GET_ALL_BRANDS_SUCCESS,
                payload: { brands }
            });
            await dispatch({
                type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
                payload: { products }
            });
            await dispatch({
                type: orderConstants.GET_ALL_ORDERS_SUCCESS,
                payload: { orders }
            });
            await dispatch({
                type: sizeConstants.GET_ALL_SIZE_SUCCESS,
                payload: { sizes }
            })
            await dispatch({
                type: userConstants.GET_ALL_USER_SUCCESS,
                payload: { users }
            })
        }   
    };
};