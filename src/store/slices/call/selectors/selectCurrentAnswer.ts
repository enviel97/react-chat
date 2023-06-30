import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@store/index";

const selectCurrentCall = createSelector(
  [(state: RootState) => state.call],
  (callState) => {
    return callState.callAnswer;
  }
);

export default selectCurrentCall;