import { PayloadAction } from "@reduxjs/toolkit";
import { FriendRequestState } from "@store/slices/state/friendRequest";
import friendPendingAdapter from "../adapter/friendPending.adapter";

const addFriendPendingAction = (
  state: FriendRequestState,
  action: PayloadAction<FriendRequest>
) => {
  const payload = action.payload;
  friendPendingAdapter.upsertOne(state, payload);
};

export default addFriendPendingAction;
