import { PayloadAction } from "@reduxjs/toolkit";
import { ProfileState } from "../../state/profile";

export const updateFriendListAction = (
  state: ProfileState,
  action: PayloadAction<string>
) => {
  const data = action.payload;
  const friends = new Set([...state.profile.friends]);
  friends.add(data);
  state.profile.friends = [...friends];
};
