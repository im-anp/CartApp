 // get a product 
 import axios from 'axios';
 export function getProduct(){
    return function(dispatch){
       axios.get('/api/product')
       .then(function(response){
           dispatch({type:"GET_PRODUCT",payload:response.data})
       })
        .catch(function(err){
            dispatch({type:"GET_PRODUCT_REJECTED",payload:err})
        })
   }
    // return{
   //     type:"GET_PRODUCT",
   // }
 }

 export function postProduct(book){
   return function(dispatch){
       axios.post('/api/product',book)
       .then(function(response){
           dispatch({type:"POST_PRODUCT",payload:response.data})
       })
        .catch(function(err){
            dispatch({type:"POST_PRODUCT_REJECTED",payload:err})
        })
   }
    // return{
   //     type:"POST_PRODUCT",
   //     payload:book
   // }
 }
 // delete a product
 export function deleteProduct(id){
     //return{
     //    type:"DEL_PRODUCT",
     //    payload:id
     //}
      return function(dispatch){
       axios.delete('/api/product/'+ id)
       .then(function(response){
           dispatch({type:"DEL_PRODUCT",payload:id})
       })
        .catch(function(err){
            dispatch({type:"DEL_PRODUCT_REJECTED",payload:"there is an error while posting"})
        })
   }
 }

 export function updateProduct(book){
     return{
         type:"UPDATE_PRODUCT",
         payload:book
     }
 }
export function resetButton(){
     return{
         type:"RESET_BUTTON",
     }
 }