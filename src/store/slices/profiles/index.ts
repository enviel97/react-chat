import { createSlice } from "@reduxjs/toolkit";
import SliceName from "@store/common/sliceName";
import { ProfileState } from "../state/profile";
import { updateImageAction } from "./actions/updateImage.action";
import { updateProfileAction } from "./actions/updateProfile.action";
import { updateUserAction } from "./actions/updateUser.action";
import { fetchProfileThunk } from "./extraReducers/fetchProfile.thunk";

export const profilesSlice = createSlice({
  name: SliceName.profile,
  initialState: {} as ProfileState,
  reducers: {
    updateUser: updateUserAction,
    updateProfile: updateProfileAction,
    updateImage: updateImageAction,
  },
  extraReducers: (builder) => {
    fetchProfileThunk(builder);
  },
});

export const { updateUser, updateProfile, updateImage } = profilesSlice.actions;

export { default as selectProfile } from "./selector/selectProfile";
export { default as selectImage } from "./selector/selectImage";
export { default as selectUser } from "./selector/selectUser";

export default profilesSlice.reducer;
