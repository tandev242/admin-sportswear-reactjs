import { brandConstants } from '../actions/constants';

const initState = {
    brands: [],
    loading: false,
    error: null
}

export default (state = initState, action) => {
    switch (action.type) {
        case brandConstants.GET_ALL_BRANDS_REQUEST:
            state = {
                ...state,
                loading: true,
            }
            break;
        case brandConstants.GET_ALL_BRANDS_SUCCESS:
            state = {
                ...state,
                brands: action.payload.brands,
                loading: false,
            }
            break;
        case brandConstants.GET_ALL_BRANDS_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
        case brandConstants.ADD_NEW_BRAND_REQUEST:
            state = {
                ...state,
                loading: true,
            }
            break;
        case brandConstants.ADD_NEW_BRAND_SUCCESS:
            state = {
                ...state,
                loading: false,
            }
            break;
        case brandConstants.ADD_NEW_BRAND_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
        case brandConstants.DELETE_BRANDS_REQUEST:
            state = {
                ...state,
                loading: true,
            }
            break;
        case brandConstants.DELETE_BRANDS_SUCCESS:
            state = {
                ...state,
                loading: false,
            }
            break;
        case brandConstants.DELETE_BRANDS_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
            break;
        case brandConstants.ADD_NEW_BRAND_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
        case brandConstants.UPDATE_BRANDS_REQUEST:
            state = {
                ...state,
                loading: true,
            }
            break;
        case brandConstants.UPDATE_BRANDS_SUCCESS:
            state = {
                ...state,
                loading: false,
            }
            break;
        case brandConstants.UPDATE_BRANDS_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
            break;

    }
    return state;
}