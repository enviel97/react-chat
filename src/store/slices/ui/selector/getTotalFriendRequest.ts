import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@store/index";

const selectTabFriends = createSelector(
  (state: RootState) => state,
  (state) => state.ui.totalFriendRequest
);

export default selectTabFriends;
