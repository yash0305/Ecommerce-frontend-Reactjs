import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    // counter: counterReducer,
  },
  // redux-thunk is included by default
});

export default store;
