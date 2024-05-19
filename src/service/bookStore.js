import { configureStore, combineReducers } from "@reduxjs/toolkit";
import bookSliceReducer from "./bookStoreSlice";

export const store = configureStore({
  reducer: combineReducers({
    books: bookSliceReducer,
  }),
});
