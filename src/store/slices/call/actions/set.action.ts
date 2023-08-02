import type { CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import type { CallState } from "@store/slices/state/call";
import type { MediaConnection } from "peerjs";
import callsAdapter from "../adapter/call.adapter";
import { CallErrorMapping } from "../common/error";

type SetAction<T> = CaseReducer<CallState, PayloadAction<T | undefined>>;

export const setCallAction: SetAction<string> = (state, action) => {
  state.callId = action.payload;
};

export const setMediaConnectionAction: SetAction<MediaConnection> = (
  state,
  action
) => {
  state.mediaConnection = action.payload;
  // Answer call
  const currentCall = state.callId;
  if (!currentCall) return;
  callsAdapter.updateOne(state, {
    id: currentCall,
    changes: { status: "answer" },
  });
};

export const setCallErrorAction: SetAction<CallErrorType> = (state, action) => {
  const payload = action.payload;
  if (!payload) return void (state.errorMess = undefined);
  state.errorMess = CallErrorMapping[payload];
};
