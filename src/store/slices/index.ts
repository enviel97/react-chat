import SliceName from "@store/common/sliceName";
import ConversationReducer from "./conversations";
import MessageReducer from "./messages";
import UserReducer from "./users";
import UiReducer from "./ui";
import FriendRequestReducer from "./friendRequest";
import FriendPendingReducer from "./friendPending";
import ProfileReducer from "./profiles";
import CallReducer from "./call";
import { ignoreSlice, createThunkAction } from "@store/utils/ignoreSlice";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";

const ReducerList = Object.freeze({
  [SliceName.conversation]: ConversationReducer,
  [SliceName.message]: MessageReducer,
  [SliceName.user]: UserReducer,
  [SliceName.friend_request]: FriendRequestReducer,
  [SliceName.friend_pending]: FriendPendingReducer,
  [SliceName.ui]: UiReducer,
  [SliceName.profile]: ProfileReducer,
  [SliceName.call]: CallReducer,
});
// Ignore slice
const IGNORE_CALL_SLICE = ignoreSlice(
  SliceName.call,
  ...[
    ...createThunkAction("connect"),
    ...createThunkAction("localStream"),
    "setConnection",
  ]
);

export const reducerStorage = [SliceName.ui, SliceName.profile];

export const ignoreChecking = {
  paths: [SliceName.call, SliceName.user],
  actions: [
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    ...IGNORE_CALL_SLICE,
  ],
};
// SliceName.cache,
export default ReducerList;
