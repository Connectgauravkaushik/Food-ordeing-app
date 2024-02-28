
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import cuisinesReducer from "./resCuisinesSlice";
import restaurantsReducer from "./resNamesSlice";
import restaurantItemReducer from "./resItemsSlice";
import cartItemReducer from "./createStoreSlice";
import searchSlice from "./searchSlice";
import SearchResReducer from "./searchResSlice";
import mockDataSlice from "./mockDataSlice";
import loginReducer from "./loginPageSlice";

const appStore = configureStore(
    {
        reducer: {
            user: userReducer,
            loginState: loginReducer,
            cuisines: cuisinesReducer,
            restaurants: restaurantsReducer,
            restaurantsItem: restaurantItemReducer,
            cartItem: cartItemReducer,
            search: searchSlice,
            searchRes: SearchResReducer,
            mockData: mockDataSlice
        }
    }
)
export default appStore;