import { createSlice } from "@reduxjs/toolkit";

const resNamesSlice = createSlice({
    name: "Restaurants",
    initialState: {
        restaurants: null,
        highRatedRestaurants: null,
        pureVegRestaurants: null,
        fastDeliveryRestaurants: null
    },
    reducers: {
        addResItems: (state, action) => {
            state.restaurants = action.payload;
        },
        addHighRatedItems: (state, action) => {
            state.highRatedRestaurants = action.payload;
        },
        addPureVegRestaurants: (state, action) => {
            state.pureVegRestaurants = action.payload;
        },
        addFastDeliveryRestaurants: (state, action) => {
            state.fastDeliveryRestaurants = action.payload;
        }
    }
});

export const { addResItems, addHighRatedItems, addPureVegRestaurants, addFastDeliveryRestaurants } = resNamesSlice.actions;

export default resNamesSlice.reducer;