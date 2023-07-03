import { isAnyOf } from "@reduxjs/toolkit";
import { authStatus, signIn } from "@store/repo/authenticate/authenticate";
import { fetchProfile } from "@store/repo/user";
import { CallExtraBuilder } from "@store/slices/state/call";

const authenticateThunk = (builder: CallExtraBuilder) => {
  builder.addCase(fetchProfile.fulfilled, (state, action) => {
    const payload = action.payload;
    state.avatar = payload.avatar;
    state.name = payload.displayName;
  });
};

export default authenticateThunk;
