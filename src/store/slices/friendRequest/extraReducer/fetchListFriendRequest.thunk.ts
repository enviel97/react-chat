import { PayloadAction } from "@reduxjs/toolkit";
import { State } from "@store/common/state";
import fetchListFriendRequest from "@store/repo/user/apis/friendRequest/fetchListFriendRequest";
import { FriendRequestExtraBuilder } from "@store/slices/state/friendRequest";
import friendRequestAdapter from "../adapter/friendRequest.adapter";

type PayloadActionList = Response<FriendRequest[]>;

const fetchListFriendRequestThunk = (builder: FriendRequestExtraBuilder) => {
  builder
    .addCase(fetchListFriendRequest.pending, (state) => {
      if (state.process === State.IDLE || state.process === State.PENDING) {
        state.process = State.PENDING;
      } else state.process = State.REFRESH;
    })
    .addCase(fetchListFriendRequest.rejected, (state, action) => {
      if (action.meta.aborted) state.process = State.PENDING;
      else state.process = State.ERROR;
    })
    .addCase(
      fetchListFriendRequest.fulfilled,
      (state, { payload }: PayloadAction<PayloadActionList>) => {
        const userProfiles = payload.data ?? [];
        friendRequestAdapter.upsertMany(state, userProfiles);
        state.process = State.FULFILLED;
      }
    );
};
export default fetchListFriendRequestThunk;
