import { PayloadAction } from "@reduxjs/toolkit";
import { ProfileState } from "../../state/profile";

interface ProfileAvatarPayload {
  file?: string;
  type: "avatar" | "banner";
}

export const updateImageAction = (
  state: ProfileState,
  action: PayloadAction<ProfileAvatarPayload>
) => {
  const data = action.payload;
  state.profile[data.type] = data.file;
};
