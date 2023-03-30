import SliceName from "@store/common/sliceName";
import ConversationReducer from "./conversations";
import MessageReducer from "./messages";
import UserReducer from "./users";
import UiReducer from "./ui";
import FriendRequestReducer from "./friendRequest";

const ReducerList = Object.freeze({
  [SliceName.conversation]: ConversationReducer,
  [SliceName.message]: MessageReducer,
  [SliceName.user]: UserReducer,
  [SliceName.friend_request]: FriendRequestReducer,
  [SliceName.ui]: UiReducer,
});

export const reducerStorage = [SliceName.ui];

export default ReducerList;
