import { PayloadAction } from "@reduxjs/toolkit";
import { ProfileState } from "../../state/profile";
import { merge } from "lodash";

export const updateProfileAction = (
  state: ProfileState,
  action: PayloadAction<Partial<UserProfile>>
) => {
  state.profile = merge(state.profile, action.payload);
};
