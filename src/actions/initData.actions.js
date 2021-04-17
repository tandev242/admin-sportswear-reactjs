import {
    categoryConstants, 
    productConstants,
    // productConstants,
    // orderConstants,
  } from "./constants";

import axios from 'axios';

export const getInitialData = () =>{
    return async (dispatch) => {
        const res = await axios.post(`api/initialData`);
        if( res.status === 200){
            const { categories , products } = res.data;
            // console.log(res.data);
            dispatch({
                type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
                payload: { categories },
            });
            dispatch({
                type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
                payload: { products }
            })
        }   
        // console.log(res.status);
    };
};