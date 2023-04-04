import SliceName from "@store/common/sliceName";
import ConversationReducer from "./conversations";
import MessageReducer from "./messages";
import UserReducer from "./users";
import UiReducer from "./ui";
import FriendRequestReducer from "./friendRequest";
import FriendPendingReducer from "./friendPending";

const ReducerList = Object.freeze({
  [SliceName.conversation]: ConversationReducer,
  [SliceName.message]: MessageReducer,
  [SliceName.user]: UserReducer,
  [SliceName.friend_request]: FriendRequestReducer,
  [SliceName.friend_pending]: FriendPendingReducer,
  [SliceName.ui]: UiReducer,
});

export const reducerStorage = [SliceName.ui];

export default ReducerList;
