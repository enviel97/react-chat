import { createSlice } from "@reduxjs/toolkit";
import { State } from "@store/common/state";
import SliceName from "@store/common/sliceName";
import { RootState } from "@store/index";
import friendPendingAdapter from "./adapter/friendPending.adapter";
import { FriendRequestState } from "../state/friendRequest";
import addFriendPendingAction from "./actions/addFriendPending.action";
import removeFriendPendingAction from "./actions/removeFriendPending.action";

import fetchFriendPendingThunk from "./extraReducer/fetchFriendPending.thunk";
import fetchFriendRequestCancelThunk from "./extraReducer/fetchFriendRequestCancel.thunk";

export const friendPendingSlice = createSlice({
  name: SliceName.friend_request,
  initialState: friendPendingAdapter.getInitialState({
    process: State.IDLE,
  }) as FriendRequestState,
  reducers: {
    addFriendPending: addFriendPendingAction,
    removeFriendPending: removeFriendPendingAction,
  },
  extraReducers: (builder) => {
    fetchFriendPendingThunk(builder);
    fetchFriendRequestCancelThunk(builder);
  },
});

export const {
  selectIds: selectFriendPendingIds,
  selectById: selectFriendPendingById,
  selectTotal: selectFriendPendingTotal,
} = friendPendingAdapter.getSelectors(
  (state: RootState) => state[SliceName.friend_pending]
);

export const { addFriendPending, removeFriendPending } =
  friendPendingSlice.actions;

export default friendPendingSlice.reducer;
