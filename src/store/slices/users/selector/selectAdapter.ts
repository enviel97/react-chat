import { createDraftSafeSelector } from "@reduxjs/toolkit";
import type { RootState } from "@store/index";
import userProfilesAdapter from "../adapter/user.adapter";

export const {
  selectIds: selectUserIds,
  selectById: selectUserById,
  selectAll: selectUsers,
} = userProfilesAdapter.getSelectors((state: RootState) => state.user);

export const selectFriendIds = createDraftSafeSelector(selectUsers, (users) => {
  return users.map((profile) => profile.user.getId());
});

export const selectOnlineIds = createDraftSafeSelector(
  (state: RootState) => state.user,
  (friendsState) => {
    return friendsState.onlineIds;
  }
);
