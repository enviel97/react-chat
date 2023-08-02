import { createDraftSafeSelector } from "@reduxjs/toolkit";
import { RootState } from "@store/index";

const selectProfile = createDraftSafeSelector(
  [(state: RootState) => state.profile],
  (profileState) => profileState.profile
);

export default selectProfile;
