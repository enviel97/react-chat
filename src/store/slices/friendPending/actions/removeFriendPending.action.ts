import { PayloadAction } from "@reduxjs/toolkit";
import { FriendRequestState } from "@store/slices/state/friendRequest";
import friendPendingAdapter from "../adapter/friendPending.adapter";

const removeFriendPendingAction = (
  state: FriendRequestState,
  action: PayloadAction<string>
) => {
  const payload = action.payload;
  friendPendingAdapter.removeOne(state, payload);
};

export default removeFriendPendingAction;
