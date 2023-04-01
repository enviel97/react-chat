import { createSlice } from "@reduxjs/toolkit";
import { State } from "@store/common/state";
import SliceName from "@store/common/sliceName";
import { RootState } from "@store/index";
import userFriendRequestAdapter from "./adapter/friendRequest.adapter";
import { FriendRequestState } from "../state/friendRequest";
import fetchListFriendRequestThunk from "./extraReducer/fetchListFriendRequest.thunk";
import addFriendRequestAction from "./action/addFriendRequest.action";
import removeFriendRequestAction from "./action/removeFriendRequest.action";
import fetchFriendRequestResponseThunk from "./extraReducer/fetchFriendRequestResponse.thunk";

export const friendRequestSlice = createSlice({
  name: SliceName.friend_request,
  initialState: userFriendRequestAdapter.getInitialState({
    process: State.IDLE,
  }) as FriendRequestState,
  reducers: {
    addFriendRequest: addFriendRequestAction,
    removeFriendRequest: removeFriendRequestAction,
  },
  extraReducers: (builder) => {
    fetchListFriendRequestThunk(builder);
    fetchFriendRequestResponseThunk(builder);
  },
});

export const {
  selectIds: selectFriendRequestIds,
  selectById: selectFriendRequestById,
  selectTotal: selectFriendRequestTotal,
} = userFriendRequestAdapter.getSelectors(
  (state: RootState) => state[SliceName.friend_request]
);

export const { addFriendRequest, removeFriendRequest } =
  friendRequestSlice.actions;

export default friendRequestSlice.reducer;
