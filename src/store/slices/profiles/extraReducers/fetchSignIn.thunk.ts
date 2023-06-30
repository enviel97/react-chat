import { signIn } from "@store/repo/authenticate/authenticate";
import { ProfileExtraBuilder } from "@store/slices/state/profile";

const fetchSignIn = (builder: ProfileExtraBuilder) => {
  builder
    .addCase(signIn.pending, (state) => {
      state.process = "loading";
    })
    .addCase(signIn.rejected, (state) => {
      state.process = "error";
    })
    .addCase(signIn.fulfilled, (state, action) => {
      const payload = action.payload;
      if (!payload || !payload.data) return;
      state.user = payload.data;
      state.process = "success";
    });
};

export default fetchSignIn;
