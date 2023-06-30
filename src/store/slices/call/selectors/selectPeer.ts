import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@store/index";

const selectPeer = createSelector(
  [(state: RootState) => state.call],
  (callState) => {
    return callState.peer;
  }
);

export default selectPeer;
