import SliceName from "@store/common/sliceName";
import ConversationReducer from "./conversations";
import MessageReducer from "./messages";
import UserReducer from "./users";
import UiReducer from "./ui";
import FriendRequestReducer from "./friendRequest";
import FriendPendingReducer from "./friendPending";
import ProfileReducer from "./profiles";
import CallReducer from "./call";
import { ignoreSlice } from "@store/utils/ignoreSlice";
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

export const reducerStorage = [SliceName.ui, SliceName.profile];

export const ignoreChecking = {
  paths: [SliceName.call],
  actions: [
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    ...ignoreSlice(
      SliceName.call,
      "addConnectionModel",
      "deleteConnectionModel"
    ),
  ],
};
// SliceName.cache,
export default ReducerList;
