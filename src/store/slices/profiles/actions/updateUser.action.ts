import { PayloadAction } from "@reduxjs/toolkit";
import { ProfileState } from "../../state/profile";

export const updateUserAction = (
  state: ProfileState,
  action: PayloadAction<User>
) => {
  state.user = Object.entries(action.payload).reduce(
    (newObject: Record<string, any>, currentValue) => {
      const [key, value] = currentValue;
      if (value) newObject[key] = value;
      return newObject;
    },
    { ...state.user }
  ) as User;
};
