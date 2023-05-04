import { ProfileExtraBuilder } from "@store/slices/state/profile";
import { changeStatus } from "@store/repo/user";
import { merge } from "lodash";

export const fetchProfileUpdateThunk = (builder: ProfileExtraBuilder) => {
  builder.addCase(changeStatus.fulfilled, (state, action) => {
    console.log({ action });
    if (!action.payload) return;
    state.profile = merge(state.profile, action.payload);
  });
};
