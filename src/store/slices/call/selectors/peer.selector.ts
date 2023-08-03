import { createDraftSafeSelector } from "@reduxjs/toolkit";
import type { RootState } from "@store/index";

export const selectPeer = createDraftSafeSelector(
  (state: RootState) => state.call,
  (callState) => callState.peer
);

export const selectMediaStream = createDraftSafeSelector(
  (state: RootState) => state.call,
  (callState) => callState.localStream
);

export const selectMediaConnection = createDraftSafeSelector(
  (state: RootState) => state.call,
  (callState) => callState.mediaConnection
);
