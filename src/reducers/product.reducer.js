import { productConstants } from "../actions/constants";


const initialState = {
    products: [],
    loading: false,
    error: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case productConstants.GET_ALL_PRODUCTS_REQUEST:
            // console.log(action.payload.products);
            state = {
                ...state,
                loading: true,
            }
            break;
        case productConstants.GET_ALL_PRODUCTS_SUCCESS:
            // console.log(action.payload.products);
            state = {
                ...state,
                products: action.payload.products,
                loading: false
            }
            break;
        case productConstants.GET_ALL_PRODUCTS_FAILURE:
            // console.log(action.payload.products);
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
            break;
    }
    return state;
}