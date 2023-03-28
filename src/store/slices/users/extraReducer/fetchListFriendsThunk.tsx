import { PayloadAction } from "@reduxjs/toolkit";
import { State } from "@store/common/state";
import { fetchListFriends } from "@store/repo/user";
import { UserProfileExtraBuilder } from "@store/slices/state/user";
import userProfilesAdapter from "../adapter/user.adapter";

type PayloadActionList = Response<UserProfile[]>;

const fetchListFriendsThunk = (builder: UserProfileExtraBuilder) => {
  builder
    .addCase(fetchListFriends.pending, (state) => {
      state.process = State.PENDING;
    })
    .addCase(fetchListFriends.rejected, (state) => {
      state.process = State.ERROR;
    })
    .addCase(
      fetchListFriends.fulfilled,
      (state, { payload }: PayloadAction<PayloadActionList>) => {
        const userProfiles = payload.data;
        if (!userProfiles) return;
        userProfilesAdapter.upsertMany(state, userProfiles);
      }
    );
};
export default fetchListFriendsThunk;
