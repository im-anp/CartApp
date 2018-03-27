import {applyMiddleware, createStore} from 'redux';

import reducers from './reducers/index';
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import ProductList from './components/pages/productLists';
import Cart from './components/pages/cart';
import ProductForm from './components/pages/productForm';
import Main from './main';
import Menu from './components/menu';
import Footer from './components/footer';
import {Router,IndexRoute,Route,browserHistory} from 'react-router';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import {addToCart} from './actions/cartAction';
import {postProduct} from './actions/productActions';
import {deleteProduct} from './actions/productActions';
import {updateProduct} from './actions/productActions';


// Step 1 create the store
const middleware = applyMiddleware(thunk,logger());
const store = createStore(reducers,middleware);
const Routes = (
    <Provider store={store}>
    <Router history={browserHistory}>
        <Route path='/' component={Main}>
        <IndexRoute component={ProductList} />
        <Route path='/admin' component={ProductForm} />
        <Route path='/cart' component={Cart} />   
        </Route>
    </Router>
    </Provider>
)
render(
   Routes , document.getElementById('app')
);

/*store.subscribe(function(){
    console.log('current state is:' , store.getState());
   // console.log('current price:' , store.getState()[1].price);
});*/

//STEP 2 create and dispatch action
/*store.dispatch({type:"POST_PRODUCT",
 payload: [{
     id:1,
     title:'this is product title',
     description:'saving trimmer with 3 hour battry life',
     price: 1499
    },
    {
    id:2,
     title:'this is product second title',
     description:'saving trimmer with 3 hour battry life',
     price: 556
    },
]
});*/
/*store.dispatch(postProduct(
    [{
     id:1,
     title:'this is product title',
     description:'saving trimmer with 3 hour battry life',
     price: 1499
    },
    {
    id:2,
     title:'this is product second title',
     description:'saving trimmer with 3 hour battry life',
     price: 556
    },
     {
    id:3,
     title:'this is product second title 3',
     description:'love this shirt',
     price: 2299
    },
]
));*/
/*store.dispatch({
    type:"DEL_PRODUCT",
    payload:{id:2}
});*/
//store.dispatch(deleteProduct({id:2}));
// update product
/*store.dispatch({
    type:"UPDATE_PRODUCT",
    payload:{
        id:1,
        title:"hi this is anoop doing all stuff"
    }
});*/
/*store.dispatch(updateProduct({
    id:1,
    title:"hi this is anoop doing all stuff"
}));*/

/* CART ACTIONS
store.dispatch({
    type:"ADD_TO_CART",
    payload:[{id:2}]
});*/
//store.dispatch(addToCart([{id:2}]));
