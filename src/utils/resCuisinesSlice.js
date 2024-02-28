import { createSlice } from "@reduxjs/toolkit";

const resCuisinesSlice = createSlice({
    name:"Cuisines Data",
    initialState:null,
    reducers:{
        addCusinesData : ( state , action) => {
             return action.payload;
        },
    },

});

export const {addCusinesData} = resCuisinesSlice.actions;

export default resCuisinesSlice.reducer;
