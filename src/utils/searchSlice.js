import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({

    name: 'search',
    initialState: null,
    reducers: {
        cacheResults: (state, action) => {
            return action.payload;;
        },
        clearResults: (state, action) => {
            return null;
        }
    },

});

export const { cacheResults , clearResults} = searchSlice.actions;

export default searchSlice.reducer;