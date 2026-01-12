import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  // redux-thunk is included by default
});

export default store;
