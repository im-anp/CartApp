//ALL PRODUCT REDUCERS
export function productReducers(state={books:[]},action){
    switch(action.type){
        case "GET_PRODUCT":
        return {...state,books:[...action.payload]}   
        break;

        case "POST_PRODUCT":
        return {...state, books:[...state.books, ...action.payload], msg:'Saved! Click to continue', style:'success', validation:'success'}   
        break;

        case "POST_PRODUCT_REJECTED":
        return {...state, msg:'Please, try again', style:'danger', validation:'error'}
        break;

        case "RESET_BUTTON":
        return {...state, msg:null, style:'primary', validation:null}
        break;
        case "DEL_PRODUCT":
        const currentBookToDelete = [...state.books];
        const indexToDelete = currentBookToDelete.findIndex(      
        function(book){        
            return book._id == action.payload;      
        } );
        return {books: [...currentBookToDelete.slice(0, indexToDelete), ...currentBookToDelete.slice(indexToDelete + 1)]} ;
        break;
        
        case "UPDATE_PRODUCT":
        const currentBookToUpdate = [...state.books];  
        const indexToUpdate = currentBookToUpdate.findIndex(function(book){
            return book._id === action.payload._id;
        })
        
        const newBookToUpdate = currentBookToUpdate[indexToUpdate].title = action.payload.title;
        console.log("upadate is:",newBookToUpdate);
        //return {books: [...currentBookToUpdate.slice(0,indexToUpdate), ...currentBookToUpdate.slice(indexToUpdate + 1)]}
        return {books:[ ...currentBookToUpdate]};
        break;
    }
    return state
}