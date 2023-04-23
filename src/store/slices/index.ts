import SliceName from "@store/common/sliceName";
import ConversationReducer from "./conversations";
import MessageReducer from "./messages";
import UserReducer from "./users";
import UiReducer from "./ui";
import FriendRequestReducer from "./friendRequest";
import FriendPendingReducer from "./friendPending";
import ProfileReducer from "./profiles";
import CacheReducer from "./cache";

const ReducerList = Object.freeze({
  [SliceName.cache]: CacheReducer,
  [SliceName.conversation]: ConversationReducer,
  [SliceName.message]: MessageReducer,
  [SliceName.user]: UserReducer,
  [SliceName.friend_request]: FriendRequestReducer,
  [SliceName.friend_pending]: FriendPendingReducer,
  [SliceName.ui]: UiReducer,
  [SliceName.profile]: ProfileReducer,
});

export const reducerStorage = [SliceName.ui, SliceName.profile];

// SliceName.cache,
export default ReducerList;
