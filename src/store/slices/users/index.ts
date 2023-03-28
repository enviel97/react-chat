import { createSlice } from "@reduxjs/toolkit";
import { State } from "@store/common/state";
import SliceName from "@store/common/sliceName";
import userProfilesAdapter from "./adapter/user.adapter";
import fetchListFriendsThunk from "./extraReducer/fetchListFriendsThunk";
import { addFriendAction } from "./actions/addFriend.action";
import { RootState } from "@store/index";

export const usersSlice = createSlice({
  name: SliceName.user,
  initialState: userProfilesAdapter.getInitialState({
    process: State.IDLE,
  }),
  reducers: {
    addFriend: addFriendAction,
  },
  extraReducers: (builder) => {
    fetchListFriendsThunk(builder);
  },
});

export const { selectIds: selectUserIds, selectById: selectUserById } =
  userProfilesAdapter.getSelectors((state: RootState) => state[SliceName.user]);

export const { addFriend } = usersSlice.actions;

export default usersSlice.reducer;
