import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@store/index";

export const selectPeer = createSelector(
  (state: RootState) => state.call,
  (callState) => callState.peer
);

export const selectConnection = createSelector(
  [(state: RootState) => state.call],
  (callState) => {
    const connection = callState.mediaConnection;
    const localStream = callState.localStream;
    return { connection, localStream };
  }
);
