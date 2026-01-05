import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import searchReducer from "./search/searchSlice";
import authReducer from "./auth/authSlice";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
