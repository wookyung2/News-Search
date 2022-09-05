import { configureStore } from "@reduxjs/toolkit";
import newsReducer from "./newsSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, newsReducer.reducer);

const store = configureStore({
  reducer: persistedReducer,
});

export default store;
