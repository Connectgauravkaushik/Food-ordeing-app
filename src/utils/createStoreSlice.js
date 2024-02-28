import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
    name: "Cart Items",
    initialState: {
        items: {
            name: null,
            item: [],
        }
    },
    reducers: {
        addCartItems: (state, action) => {
            state.items.item.push(action.payload);
        },
        addResName: (state, action) => {
            state.items.name = action.payload;
        },
        clearCartItem: (state, action) => {
            state.items.item.length = 0;
            state.items.name = null
        },
        deleteBreak: (state, action) => {
            const itemId = action.payload;
            let isExist = state.items.item.find(item => item.card.info.id === itemId);
            if (isExist) {
                state.items.item.splice(isExist, 1);
                if (state.items.item.length === 0) {
                    state.items.name = null;
                }

            } else {
                state.items.item.filter((it) => it?.card?.info?.id !== itemId);
            }

        }
    }

});

export const { addCartItems, clearCartItem, addResName, deleteBreak } = CartSlice.actions;
export default CartSlice.reducer;