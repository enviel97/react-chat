import { PayloadAction } from "@reduxjs/toolkit";
import { State } from "@store/common/state";
import { fetchFriendRequestCancel } from "@store/repo/user";
import { FriendRequestExtraBuilder } from "@store/slices/state/friendRequest";
import friendPendingAdapter from "../adapter/friendPending.adapter";

const fetchFriendRequestCancelThunk = (builder: FriendRequestExtraBuilder) => {
  builder.addCase(
    fetchFriendRequestCancel.fulfilled,
    (state, { payload }: PayloadAction<Response<string>>) => {
      state.process = State.FULFILLED;
      if (!payload.data) return;
      friendPendingAdapter.removeOne(state, payload.data);
    }
  );
};
export default fetchFriendRequestCancelThunk;
