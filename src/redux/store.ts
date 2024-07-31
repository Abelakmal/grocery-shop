import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import addressReducer from "./features/addressSlice"

export default configureStore({
  reducer: {
    user: userReducer,
    address: addressReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
