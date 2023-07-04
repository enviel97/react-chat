import { PayloadAction } from "@reduxjs/toolkit";
import { UserProfileState } from "@store/slices/state/user";
import userProfilesAdapter from "../adapter/user.adapter";

interface UpdateAvatarPayload {
  id: string;
  changes: Partial<UserProfile>;
}

export const updateFriendProfileAction = (
  state: UserProfileState,
  action: PayloadAction<UpdateAvatarPayload>
) => {
  const { id, changes } = action.payload;
  userProfilesAdapter.updateOne(state, {
    id: id,
    changes: changes,
  });
};
