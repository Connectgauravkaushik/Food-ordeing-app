import { createSlice } from "@reduxjs/toolkit";

 const SearchResSlice = createSlice({
    name:"Search Restaurants",
    initialState:null,

    reducers:{
       addRestaurants:(state,action)=>{
          return action.payload;
       },
       clearRestaurants:(state , action) => {
         return null;
       }
    },
 });

 export const {addRestaurants , clearRestaurants} = SearchResSlice.actions;
 export default SearchResSlice.reducer;