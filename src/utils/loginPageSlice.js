import { createSlice } from "@reduxjs/toolkit";

const loginPageSlice = createSlice({
    name: "login State",
    initialState: false,
    reducers: {
        addloginState: (state, action) => {
            return action.payload;
        }
    }
});

export const { addloginState } = loginPageSlice.actions;
export default loginPageSlice.reducer;