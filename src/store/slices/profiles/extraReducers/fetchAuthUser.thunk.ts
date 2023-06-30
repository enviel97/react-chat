import { authStatus } from "@store/repo/authenticate/authenticate";
import { ProfileExtraBuilder } from "@store/slices/state/profile";

const fetchAuthUser = (builder: ProfileExtraBuilder) => {
  builder
    .addCase(authStatus.pending, (state) => {
      state.process = "loading";
    })
    .addCase(authStatus.rejected, (state, action) => {
      state.user = undefined;
      state.process = "error";
    })
    .addCase(authStatus.fulfilled, (state, action) => {
      const payload = action.payload;
      if (!payload) return;
      state.user = payload;
      state.process = "success";
    });
};

export default fetchAuthUser;
