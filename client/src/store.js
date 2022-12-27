import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import loadingReducer from "./features/loadingSlice";
import dataReducer from "./features/dataSlice";
import toastReducer from "./features/toastSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    loading: loadingReducer,
    data: dataReducer,
    toast: toastReducer,
  },
});
