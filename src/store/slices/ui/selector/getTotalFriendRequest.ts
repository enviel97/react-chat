import { createDraftSafeSelector } from "@reduxjs/toolkit";
import { RootState } from "@store/index";

const selectTabFriends = createDraftSafeSelector(
  (state: RootState) => state,
  (state) => state.ui.totalFriendRequest
);

export default selectTabFriends;
