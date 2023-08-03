import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { PersistConfig, persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import ReducerList, { ignoreChecking, reducerStorage } from "./slices";
import { enableMapSet } from "immer";

const reducer = combineReducers(ReducerList);
enableMapSet();
const persistConfig: PersistConfig<ReturnType<typeof reducer>> = {
  key: "root",
  version: 0,
  storage,
  stateReconciler: autoMergeLevel2,
  whitelist: reducerStorage,
  throttle: 500,
};
const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: import.meta.env.VITE_NODE_ENV === "dev",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ignoreChecking.actions,
        ignoredPaths: ignoreChecking.paths,
      },
    }),
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
