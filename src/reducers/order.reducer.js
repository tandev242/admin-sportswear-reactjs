import { orderConstants } from "../actions/constants";


const initialState = {
    orders: [],
    loading: false,
    error: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case orderConstants.GET_ALL_ORDERS_SUCCESS:
            // console.log(action.payload.products);
            state = {
                ...state,
                orders: action.payload.orders,
            }
            break;

        case orderConstants.UPDATE_CUSTOMER_ORDER_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;

        case orderConstants.UPDATE_CUSTOMER_ORDER_SUCCESS:
            state = {
                ...state,
                loading: false
            }
            break;
        case orderConstants.UPDATE_CUSTOMER_ORDER_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error,
            }
            break;
    }
    return state;
}