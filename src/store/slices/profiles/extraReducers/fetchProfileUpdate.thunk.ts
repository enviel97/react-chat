import { ProfileExtraBuilder } from "@store/slices/state/profile";
import { changeStatus, updateProfile } from "@store/repo/user";
import { merge } from "lodash";
import { isAnyOf } from "@reduxjs/toolkit";

export const fetchProfileUpdate = (builder: ProfileExtraBuilder) => {
  // change status
  builder.addMatcher(
    isAnyOf(changeStatus.fulfilled, updateProfile.fulfilled),
    (state, action) => {
      const payload = action.payload?.data;
      if (!payload) return;
      state.profile = merge(state.profile, payload);
    }
  );
};
