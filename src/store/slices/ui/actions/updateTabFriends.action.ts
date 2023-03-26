import { PayloadAction } from "@reduxjs/toolkit";
import { UiState } from "@store/slices/state/ui";

const updateTabFriendsActions = (
  state: UiState,
  action: PayloadAction<"list" | "request" | "profile">
) => {
  state.tabFriendSelect = action.payload;
};

export default updateTabFriendsActions;
