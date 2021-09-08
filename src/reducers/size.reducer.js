import { sizeConstants } from "../actions/constants";


const initialState = {
    sizes: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case sizeConstants.GET_ALL_SIZE_SUCCESS:
            // console.log(action.payload.products);
            state = {
                ...state,
                sizes: action.payload.sizes,
            }
            break;
    }
    return state;
}