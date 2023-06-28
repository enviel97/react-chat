import { createSlice } from "@reduxjs/toolkit";
import SliceName from "@store/common/sliceName";
import { ProfileState } from "../state/profile";
import { updateFriendListAction } from "./actions/updateFriendList.action";
import { updateImageAction } from "./actions/updateImage.action";
import { updateProfileAction } from "./actions/updateProfile.action";
import { updateUserAction } from "./actions/updateUser.action";
import { getProfile } from "./extraReducers/fetchProfile.thunk";
import { fetchProfileUpdate } from "./extraReducers/fetchProfileUpdate.thunk";

export const profilesSlice = createSlice({
  name: SliceName.profile,
  initialState: {} as ProfileState,
  reducers: {
    updateUser: updateUserAction,
    updateProfile: updateProfileAction,
    updateFriendList: updateFriendListAction,
    updateImage: updateImageAction,
  },
  extraReducers: (builder) => {
    getProfile(builder);
    fetchProfileUpdate(builder);
  },
});

export const { updateUser, updateProfile, updateImage, updateFriendList } =
  profilesSlice.actions;

export { default as selectProfile } from "./selector/selectProfile";
export { default as selectImage } from "./selector/selectImage";
export { default as selectUser } from "./selector/selectUser";
export { default as validateUser } from "./selector/selectValidateIsUser";

export default profilesSlice.reducer;
