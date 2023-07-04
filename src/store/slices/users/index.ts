import { createSlice } from "@reduxjs/toolkit";
import { State } from "@store/common/state";
import SliceName from "@store/common/sliceName";
import userProfilesAdapter from "./adapter/user.adapter";
import fetchListFriendsThunk from "./extraReducer/fetchListFriendsThunk";
import { addFriendAction } from "./actions/addFriend.action";
import { UserProfileState } from "../state/user";
import { updateFriendProfileAction } from "./actions/updateFriendProfile.action";
import { updateStatusAction } from "./actions/updateStatus.action";

export const usersSlice = createSlice({
  name: SliceName.user,
  initialState: userProfilesAdapter.getInitialState({
    process: State.IDLE,
    onlineIds: [],
  }) as UserProfileState,
  reducers: {
    addFriend: addFriendAction,
    updateFriendProfile: updateFriendProfileAction,
    updateOnline: updateStatusAction,
  },
  extraReducers: (builder) => {
    fetchListFriendsThunk(builder);
  },
});

// actions
export const { addFriend, updateFriendProfile, updateOnline } =
  usersSlice.actions;

// selector
export {
  selectUserIds,
  selectUserById,
  selectUsers,
  selectFriendIds,
} from "./selector/selectAdapter";
export { selectOffline, selectOnline } from "./selector/selectStatusUser";

export default usersSlice.reducer;
