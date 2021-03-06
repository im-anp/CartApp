import axios from 'axios';

export function getCart(){
  return function(dispatch){
    axios.get('/api/cart')
     .then(function(response){
       dispatch({type:"GET_CART", payload:response.data})
     })
     .catch(function(err){
       dispatch({type:"GET_CART_REJECTED", msg:"error when getting the cart from session"})
     })
  }
}
export function addToCart(cart){
   // return{
   //     type:"ADD_TO_CART",
    //    payload:book
   // }
   return function(dispatch){
    axios.post("/api/cart", cart)
      .then(function(response){
        dispatch({type:"ADD_TO_CART", payload:response.data})
      })
      .catch(function(err){
        dispatch({type:"ADD_TO_CART_REJECTED", msg: 'error when adding to the cart'})
      })
  }
}
// Delete cart item
export function deleteCartItem(cart){
   /* return{
        type:"DELETE_CART_ITEM",
        payload:cart
    }*/
    return function(dispatch){
        axios.post("/api/cart", cart)
        .then(function(response){
            dispatch({type:"DELETE_CART_ITEM", payload:response.data})
        })
        .catch(function(err){
            dispatch({type:"DELETE_CART_ITEM_REJECTED", msg: 'error when deleting an item from the cart'})
        })
    }
}
// Update cart item
export function updateCart(_id, unit,cart){
    const currentCartToUpdate = cart;
    const indexToUpdate = currentCartToUpdate.findIndex(function(cart){
        return cart._id === _id
    })
    const newCartToUpdate = {...currentCartToUpdate[indexToUpdate], quantity: currentCartToUpdate[indexToUpdate].quantity + unit }
    
    let cartUpdate = [...currentCartToUpdate.slice(0, indexToUpdate), newCartToUpdate,...currentCartToUpdate.slice(indexToUpdate+1)]
    return function(dispatch){
        axios.post("/api/cart", cartUpdate)
        .then(function(response){
            dispatch({type:"UPDATE_CART", payload:response.data})
        })
        .catch(function(err){
            dispatch({type:"UPDATE_CART_REJECTED", msg: 'error when adding to the cart'})
        })
    }
   
}