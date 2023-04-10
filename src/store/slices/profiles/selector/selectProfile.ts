import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@store/index";

const selectProfile = createSelector(
  [(state: RootState) => state.profile],
  (profileState) => profileState.profile
);

export default selectProfile;
