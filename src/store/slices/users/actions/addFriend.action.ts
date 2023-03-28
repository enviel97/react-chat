import { PayloadAction } from "@reduxjs/toolkit";
import { UserProfileState } from "@store/slices/state/user";
import userProfilesAdapter from "../adapter/user.adapter";

export const addFriendAction = (
  state: UserProfileState,
  action: PayloadAction<UserProfile>
) => {
  const payload = action.payload;
  userProfilesAdapter.upsertOne(state, payload);
};
