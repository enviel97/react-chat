import { createSlice } from "@reduxjs/toolkit";
import SliceName from "@store/common/sliceName";
import { ProfileState } from "../state/profile";
import { updateUserAction } from "./actions/updateUser.action";
import { fetchProfileThunk } from "./extraReducers/fetchProfile.thunk";

export const profilesSlice = createSlice({
  name: SliceName.message,
  initialState: {} as ProfileState,
  reducers: {
    updateUser: updateUserAction,
  },
  extraReducers: (builder) => {
    fetchProfileThunk(builder);
  },
});

export const { updateUser } = profilesSlice.actions;

export { default as selectProfile } from "./selector/selectProfile";
export { default as selectUser } from "./selector/selectUser";

export default profilesSlice.reducer;
