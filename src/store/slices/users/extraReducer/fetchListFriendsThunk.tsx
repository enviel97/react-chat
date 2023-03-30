import { PayloadAction } from "@reduxjs/toolkit";
import { State } from "@store/common/state";
import { fetchListFriends } from "@store/repo/user";
import { UserProfileExtraBuilder } from "@store/slices/state/user";
import userProfilesAdapter from "../adapter/user.adapter";
type PayloadActionList = Response<UserProfile[]>;

const fetchListFriendsThunk = (builder: UserProfileExtraBuilder) => {
  builder
    .addCase(fetchListFriends.pending, (state) => {
      if (state.process === State.IDLE || state.process === State.PENDING) {
        state.process = State.PENDING;
      } else state.process = State.REFRESH;
    })
    .addCase(fetchListFriends.rejected, (state, action) => {
      if (action.meta.aborted) state.process = State.PENDING;
      else state.process = State.ERROR;
    })
    .addCase(
      fetchListFriends.fulfilled,
      (state, { payload }: PayloadAction<PayloadActionList>) => {
        const userProfiles = payload.data;
        state.process = State.FULFILLED;
        if (!userProfiles) return;
        userProfilesAdapter.upsertMany(state, userProfiles);
      }
    );
};
export default fetchListFriendsThunk;
