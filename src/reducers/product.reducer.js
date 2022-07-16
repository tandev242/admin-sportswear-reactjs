import { productConstants } from "../actions/constants";


const initialState = {
    products: [],
    loading: false,
    error: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case productConstants.GET_ALL_PRODUCTS_REQUEST:
            state = {
                ...state,
                loading: true,
            }
            break;
        case productConstants.GET_ALL_PRODUCTS_SUCCESS:
            state = {
                ...state,
                products: action.payload.products,
                loading: false
            }
            break;
        case productConstants.GET_ALL_PRODUCTS_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
            break;
        case productConstants.UPDATE_DISCOUNT_REQUEST:
            state = {
                ...state,
                loading: true,
            }
            break;
        case productConstants.UPDATE_DISCOUNT_SUCCESS:
            state = {
                ...state,
                loading: false
            }
            break;
        case productConstants.UPDATE_DISCOUNT_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
            break;
        case productConstants.UPDATE_PRODUCT_REQUEST:
            state = {
                ...state,
                loading: true,
            }
            break;
        case productConstants.UPDATE_PRODUCT_SUCCESS:
            state = {
                ...state,
                loading: false
            }
            break;
        case productConstants.UPDATE_PRODUCT_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
            break;
    }
    return state;
}