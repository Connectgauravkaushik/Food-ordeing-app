import { createSlice } from "@reduxjs/toolkit";


const resItemsSlice = createSlice({
    name: "restaurant Items",
    initialState: null,
    reducers: {
        addRestaurantItems: (state, action) => {
            return action.payload;
        },
        removeRestaurantItems: (state, action) => {
            return null;
        }
    },

});

export const { addRestaurantItems, removeRestaurantItems } = resItemsSlice.actions;

export default resItemsSlice.reducer;