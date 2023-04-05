import { PayloadAction } from "@reduxjs/toolkit";
import { State } from "@store/common/state";
import { fetchFriendPending } from "@store/repo/user";
import { FriendRequestExtraBuilder } from "@store/slices/state/friendRequest";
import friendPendingAdapter from "../adapter/friendPending.adapter";

type PayloadActionList = Response<FriendRequest[]>;

const fetchListFriendRequestThunk = (builder: FriendRequestExtraBuilder) => {
  builder
    .addCase(fetchFriendPending.pending, (state) => {
      if (state.process === State.IDLE || state.process === State.PENDING) {
        state.process = State.PENDING;
      } else state.process = State.REFRESH;
    })
    .addCase(fetchFriendPending.rejected, (state, action) => {
      if (action.meta.aborted) state.process = State.PENDING;
      else state.process = State.ERROR;
    })
    .addCase(
      fetchFriendPending.fulfilled,
      (state, { payload }: PayloadAction<PayloadActionList>) => {
        const friendRequests = payload.data ?? [];
        friendPendingAdapter.upsertMany(state, friendRequests);
        state.process = State.FULFILLED;
      }
    );
};
export default fetchListFriendRequestThunk;
