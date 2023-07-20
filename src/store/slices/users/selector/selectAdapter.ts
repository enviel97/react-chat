import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@store/index";
import userProfilesAdapter from "../adapter/user.adapter";

export const {
  selectIds: selectUserIds,
  selectById: selectUserById,
  selectAll: selectUsers,
} = userProfilesAdapter.getSelectors((state: RootState) => state.user);

export const selectFriendIds = createSelector(selectUsers, (users) => {
  return users.map((profile) => profile.user.getId());
});

export const selectOnlineIds = createSelector(
  (state: RootState) => state.user,
  (friendsState) => {
    return friendsState.onlineIds;
  }
);
