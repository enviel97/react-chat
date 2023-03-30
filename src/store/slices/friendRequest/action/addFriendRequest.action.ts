import { PayloadAction } from "@reduxjs/toolkit";
import { FriendRequestState } from "@store/slices/state/friendRequest";
import userFriendRequestAdapter from "../adapter/friendRequest.adapter";

const addFriendRequestAction = (
  state: FriendRequestState,
  action: PayloadAction<FriendRequest>
) => {
  const friendRequest = action.payload;
  if (!friendRequest) return;
  userFriendRequestAdapter.upsertOne(state, friendRequest);
};

export default addFriendRequestAction;
