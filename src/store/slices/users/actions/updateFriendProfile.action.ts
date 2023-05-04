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
  const payload = action.payload;
  userProfilesAdapter.updateOne(state, {
    id: payload.id,
    changes: {
      ...payload.changes,
    },
  });
};
