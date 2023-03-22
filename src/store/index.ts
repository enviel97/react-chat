import { combineReducers, configureStore } from "@reduxjs/toolkit";
import SliceName from "./common/sliceName";
import {
  ConversationReducer,
  MessageReducer,
  UiReducer,
  UserReducer,
} from "./slices";
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

const reducer = combineReducers({
  [SliceName.conversation]: ConversationReducer,
  [SliceName.message]: MessageReducer,
  [SliceName.user]: UserReducer,
  [SliceName.ui]: UiReducer,
});

const persistConfig: PersistConfig<ReturnType<typeof reducer>> = {
  key: "root",
  version: 0,
  storage,
  stateReconciler: autoMergeLevel2,
  whitelist: [SliceName.ui],
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
