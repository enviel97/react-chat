import type { CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import type { CallState } from "@store/slices/state/call";
import type { MediaConnection } from "peerjs";

type SetAction<T> = CaseReducer<CallState, PayloadAction<T | null>>;

export const setCallAction: SetAction<string> = (state, action) => {
  state.callId = action.payload;
};

export const setConnectionAction: SetAction<MediaConnection> = (
  state,
  action
) => {
  state.mediaConnection = action.payload;
};
