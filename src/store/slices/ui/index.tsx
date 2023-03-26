import { createSlice } from "@reduxjs/toolkit";
import SliceName from "@store/common/sliceName";
import { UiState } from "../state/ui";
import {
  updateTypeConversationActions,
  updateTabFriendsActions,
} from "./actions";

export const uiSlice = createSlice({
  name: SliceName.ui,
  initialState: {
    selectedConversationType: "direct",
    tabFriendSelect: "list",
  } as UiState,
  reducers: {
    updateTypeConversation: updateTypeConversationActions,
    updateTabFriends: updateTabFriendsActions,
  },
});

export const { updateTypeConversation, updateTabFriends } = uiSlice.actions;

export { default as selectConversationType } from "./selector/getTypeConversation";

export default uiSlice.reducer;
