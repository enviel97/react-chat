import { PayloadAction } from "@reduxjs/toolkit";
import { ProfileState } from "../../state/profile";

export const updateUserAction = (
  state: ProfileState,
  action: PayloadAction<User>
) => {
  if (state.user) return;
  // Just update once
  state.user = action.payload;
};
