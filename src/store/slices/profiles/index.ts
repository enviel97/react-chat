import { createSlice } from "@reduxjs/toolkit";
import SliceName from "@store/common/sliceName";
import { ProfileState } from "../state/profile";
import { updateFriendListAction } from "./actions/updateFriendList.action";
import { updateImageAction } from "./actions/updateImage.action";
import { updateProfileAction } from "./actions/updateProfile.action";
import fetchAuthUser from "./extraReducers/fetchAuthUser.thunk";
import { getProfile } from "./extraReducers/fetchProfile.thunk";
import { fetchProfileUpdate } from "./extraReducers/fetchProfileUpdate.thunk";
import fetchSignIn from "./extraReducers/fetchSignIn.thunk";

export const profilesSlice = createSlice({
  name: SliceName.profile,
  initialState: { process: "idle" } as ProfileState,
  reducers: {
    updateProfile: updateProfileAction,
    updateFriendList: updateFriendListAction,
    updateImage: updateImageAction,
  },
  extraReducers: (builder) => {
    fetchAuthUser(builder);
    getProfile(builder);
    fetchSignIn(builder);

    // await bot
    fetchProfileUpdate(builder);
  },
});

export const { updateProfile, updateImage, updateFriendList } =
  profilesSlice.actions;

export { default as selectProfile } from "./selector/selectProfile";
export { default as selectImage } from "./selector/selectImage";
export { default as selectUser } from "./selector/selectUser";
export { default as validateUser } from "./selector/selectValidateIsUser";

export default profilesSlice.reducer;
