import { userConstants } from "../actions/constants";


const initialState = {
    users: [],
    loading: false,
    error: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case userConstants.GET_ALL_USER_REQUEST:
            // console.log(action.payload.products);
            state = {
                ...state,
                loading: true,
            }
            break;
        case userConstants.GET_ALL_USER_SUCCESS:
            // console.log(action.payload.products);
            state = {
                ...state,
                users: action.payload.users,
                loading: false,
            }
            break;
        case userConstants.GET_ALL_USER_FAILURE:
            // console.log(action.payload.products);
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
            break;

        case userConstants.UPDATE_USER_REQUEST:
            // console.log(action.payload.products);
            state = {
                ...state,
                loading: true,
            }
            break;
        case userConstants.UPDATE_USER_SUCCESS:
            // console.log(action.payload.products);
            state = {
                ...state,
                loading: false,
            }
            break;
        case userConstants.UPDATE_USER_FAILURE:
            // console.log(action.payload.products);
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
            break;
        case userConstants.DELETE_USER_REQUEST:
            // console.log(action.payload.products);
            state = {
                ...state,
                loading: true,
            }
            break;
        case userConstants.DELETE_USER_SUCCESS:
            // console.log(action.payload.products);
            state = {
                ...state,
                loading: false,
            }
            break;
        case userConstants.DELETE_USER_FAILURE:
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