import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import adminReducer from "./features/adminSlice";
import addressReducer from "./features/addressSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    address: addressReducer,
    admin: adminReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
