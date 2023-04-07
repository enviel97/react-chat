import { createSelector, createSlice } from "@reduxjs/toolkit";
import { State } from "@store/common/state";
import SliceName from "@store/common/sliceName";
import userProfilesAdapter from "./adapter/user.adapter";
import fetchListFriendsThunk from "./extraReducer/fetchListFriendsThunk";
import { addFriendAction } from "./actions/addFriend.action";
import { RootState } from "@store/index";
import { UserProfileState } from "../state/user";
import string from "@utils/string";

export const usersSlice = createSlice({
  name: SliceName.user,
  initialState: userProfilesAdapter.getInitialState({
    process: State.IDLE,
  }) as UserProfileState,
  reducers: {
    addFriend: addFriendAction,
  },
  extraReducers: (builder) => {
    fetchListFriendsThunk(builder);
  },
});

export const {
  selectIds: selectUserIds,
  selectById: selectUserById,
  selectAll: selectUsers,
} = userProfilesAdapter.getSelectors(
  (state: RootState) => state[SliceName.user]
);

export const selectAccountIdsFromUser = createSelector(selectUsers, (user) => {
  return user.map(string.getId);
});

export const { addFriend } = usersSlice.actions;

export default usersSlice.reducer;
