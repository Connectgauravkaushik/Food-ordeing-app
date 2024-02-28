import { createSlice } from "@reduxjs/toolkit";

const mockDataSlice = createSlice({
    name: "mockData",
    initialState: null,
    reducers: {
        addmockData: (state, action) => {
            return action.payload;
        }
    }
});

export const { addmockData } = mockDataSlice.actions;
export default mockDataSlice.reducer;