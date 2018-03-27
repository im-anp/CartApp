
import {combineReducers} from 'redux';

import {productReducers} from './product_reducer';
import {cartReducers} from './cartReducers';

export default combineReducers({
    books: productReducers,
    cart: cartReducers
});