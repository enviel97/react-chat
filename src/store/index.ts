import { combineReducers, configureStore } from "@reduxjs/toolkit";
import expireReducer from "redux-persist-expire";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PersistConfig,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import ReducerList, { reducerStorage } from "./slices";
import SliceName from "./common/sliceName";

const reducer = combineReducers(ReducerList);

const persistConfig: PersistConfig<ReturnType<typeof reducer>> = {
  key: "root",
  version: 0,
  storage,
  stateReconciler: autoMergeLevel2,
  whitelist: reducerStorage,
  throttle: 500,
  transforms: [
    expireReducer(SliceName.cache, {
      expireSeconds: 24 * 60 * 60 * 2, // cache store in 2 day
    }),
  ],
};
const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: import.meta.env.VITE_NODE_ENV === "dev",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
