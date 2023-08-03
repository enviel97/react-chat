import { createDraftSafeSelector } from "@reduxjs/toolkit";
import { RootState } from "@store/index";

const selectUser = createDraftSafeSelector(
  [(state: RootState) => state.profile],
  (profileState) => profileState.user
);

export default selectUser;
