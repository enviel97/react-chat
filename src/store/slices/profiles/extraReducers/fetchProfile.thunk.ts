import { fetchProfile } from "@store/repo/user";
import { ProfileExtraBuilder } from "@store/slices/state/profile";
import { merge } from "lodash";

export const getProfile = (builder: ProfileExtraBuilder) => {
  builder.addCase(fetchProfile.fulfilled, (state, action) => {
    state.profile = merge(state.profile, action.payload);
  });
};
