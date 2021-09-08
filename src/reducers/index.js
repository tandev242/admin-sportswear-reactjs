import categoryReducer from './category.reducer';
import productReducer from './product.reducer';
import authReducer from './auth.reducer';
import sizeReducer from './size.reducer';
import userReducer from './user.reducer';
import brandReducer from './brand.reducer';

import { combineReducers } from 'redux';


const rootReducer = combineReducers({
    category: categoryReducer,
    product: productReducer,
    auth: authReducer,
    brand: brandReducer,
    size: sizeReducer,
    user: userReducer
});

export default rootReducer;