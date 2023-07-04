import { PayloadAction } from "@reduxjs/toolkit";
import { UserProfileState } from "@store/slices/state/user";

export const updateStatusAction = (
  state: UserProfileState,
  action: PayloadAction<string[]>
) => {
  const payload = action.payload;
  state.onlineIds = payload;
};
