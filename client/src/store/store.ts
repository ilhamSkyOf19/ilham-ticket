import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";

import storage from "redux-persist/lib/storage"; // localStorage
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["transaction"], // hanya slice ini yang disimpan
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefault) =>
    getDefault({
      serializableCheck: false, // wajib dimatikan untuk persist
    }),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
