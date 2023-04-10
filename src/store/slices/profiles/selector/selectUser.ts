import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@store/index";

const selectUser = createSelector(
  [(state: RootState) => state.profile],
  (profileState) => profileState.user
);

export default selectUser;
