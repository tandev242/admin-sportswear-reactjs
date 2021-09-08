import { userConstants } from "../actions/constants";


const initialState = {
    users: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case userConstants.GET_ALL_USER_SUCCESS:
            // console.log(action.payload.products);
            state = {
                ...state,
                users: action.payload.users,
            }
            break;
    }
    return state;
}