import { createSlice } from "@reduxjs/toolkit";
import { State } from "@store/common/state";
import SliceName from "@store/common/sliceName";
import usersAdapter from "./adapter/user.adapter";

export const usersSlice = createSlice({
  name: SliceName.user,
  initialState: usersAdapter.getInitialState({
    process: State.IDLE,
  }),
  reducers: {},
  extraReducers: (builder) => {},
});

export const {} = usersSlice.actions;

export const { selectById: selectUserById } = usersAdapter.getSelectors(
  (state: any) => state[SliceName.user]
);

export default usersSlice.reducer;
