import { createSlice } from "@reduxjs/toolkit";
import { State } from "@store/common/state";
import SliceName from "@store/common/sliceName";
import { RootState } from "@store/index";
import userFriendRequestAdapter from "./adapter/friendRequest.adapter";
import { FriendRequestState } from "../state/friendRequest";
import fetchListFriendRequestThunk from "./extraReducer/fetchListFriendRequest.thunk";
import addFriendRequestAction from "./action/addFriendRequest.action";

export const friendRequestSlice = createSlice({
  name: SliceName.friend_request,
  initialState: userFriendRequestAdapter.getInitialState({
    process: State.IDLE,
  }) as FriendRequestState,
  reducers: {
    addFriendRequest: addFriendRequestAction,
  },
  extraReducers: (builder) => {
    fetchListFriendRequestThunk(builder);
  },
});

export const {
  selectIds: selectFriendRequestIds,
  selectById: selectFriendRequestById,
} = userFriendRequestAdapter.getSelectors(
  (state: RootState) => state[SliceName.friend_request]
);

export const { addFriendRequest } = friendRequestSlice.actions;

export default friendRequestSlice.reducer;
