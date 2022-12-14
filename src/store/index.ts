import { configureStore } from "@reduxjs/toolkit";
import SliceName from "./common/sliceName";
import conversationReducer from "./slices/conversationSlice";
import messageReducer from "./slices/messageSlice";

export const store = configureStore({
  reducer: {
    [SliceName.conversation]: conversationReducer,
    [SliceName.message]: messageReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
