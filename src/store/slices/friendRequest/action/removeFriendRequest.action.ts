import { PayloadAction } from "@reduxjs/toolkit";
import { FriendRequestState } from "@store/slices/state/friendRequest";
import userFriendRequestAdapter from "../adapter/friendRequest.adapter";

const removeFriendRequestAction = (
  state: FriendRequestState,
  action: PayloadAction<string>
) => {
  const friendRequestId = action.payload;
  if (!friendRequestId) return;
  userFriendRequestAdapter.removeOne(state, friendRequestId);
};

export default removeFriendRequestAction;
