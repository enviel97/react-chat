import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@store/index";

const selectPeer = createSelector(
  [(state: RootState) => state.call],
  (callState) => {
    const { peer } = callState;
    if (!peer || peer.destroyed) return;
    if (peer.disconnected) peer.reconnect();
    return callState.peer;
  }
);

export default selectPeer;
