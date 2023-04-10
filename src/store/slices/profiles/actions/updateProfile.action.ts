import { PayloadAction } from "@reduxjs/toolkit";
import { ProfileState } from "../../state/profile";

export const updateProfileAction = (
  state: ProfileState,
  action: PayloadAction<Partial<UserProfile>>
) => {
  state.profile = Object.entries(action.payload).reduce(
    (newObject: Record<string, any>, currentValue) => {
      const [key, value] = currentValue;
      if (value) newObject[key] = value;
      return newObject;
    },
    { ...state.profile }
  ) as UserProfile;
};
