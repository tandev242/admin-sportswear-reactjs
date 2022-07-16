import { sizeConstants } from "../actions/constants";


const initialState = {
    sizes: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case sizeConstants.GET_ALL_SIZE_SUCCESS:
            state = {
                ...state,
                sizes: action.payload.sizes,
            }
            break;
    }
    return state;
}