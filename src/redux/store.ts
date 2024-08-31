import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import adminReducer from "./features/adminSlice";
import addressReducer from "./features/addressSlice";
import cartReducer from "./features/cartSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    address: addressReducer,
    admin: adminReducer,
    cart: cartReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;