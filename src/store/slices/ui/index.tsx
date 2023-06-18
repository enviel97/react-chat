import { createSlice } from "@reduxjs/toolkit";
import SliceName from "@store/common/sliceName";
import { UiState } from "../state/ui";
import {
  updateTotalFriendRequestAction,
  updateTypeConversationActions,
  updateTabFriendsActions,
} from "./actions";

export const uiSlice = createSlice({
  name: SliceName.ui,
  initialState: {
    selectedConversationType: "direct",
    tabFriendSelect: "list",
    totalFriendRequest: 0,
  } as UiState,
  reducers: {
    updateTypeConversation: updateTypeConversationActions,
    updateTabFriends: updateTabFriendsActions,
    updateTotalFriendRequest: updateTotalFriendRequestAction,
  },
});

export const {
  updateTypeConversation,
  updateTabFriends,
  updateTotalFriendRequest,
} = uiSlice.actions;

export { default as selectConversationType } from "./selector/getTypeConversation";
export { default as selectTotalFriendRequest } from "./selector/getTotalFriendRequest";

export default uiSlice.reducer;
