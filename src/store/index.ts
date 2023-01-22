import { configureStore } from "@reduxjs/toolkit";
import SliceName from "./common/sliceName";
import { ConversationReducer, MessageReducer } from "./slices";

export const store = configureStore({
  reducer: {
    [SliceName.conversation]: ConversationReducer,
    [SliceName.message]: MessageReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
