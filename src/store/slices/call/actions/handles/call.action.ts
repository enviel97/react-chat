import type { CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import type { CallState } from "@store/slices/state/call";

type CallActionReducer = CaseReducer<CallState, PayloadAction<string>>;

const callAction: CallActionReducer = (state, action) => {
  const receiver = action.payload;
  if (!state.peer || state.peer.destroyed) return;
  if (state.peer.disconnected) state.peer.reconnect();
  state.currentConnectChannel = receiver;
};

export default callAction;
