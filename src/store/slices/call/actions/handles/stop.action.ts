import type { CaseReducer } from "@reduxjs/toolkit";
import type { CallState } from "@store/slices/state/call";

type CallActionReducer = CaseReducer<CallState>;

const stopAction: CallActionReducer = (state) => {
  state.currentConnectChannel = undefined;
};

export default stopAction;
