import type { CallState } from "@store/slices/state/call";
import callsAdapter from "../adapter/call.adapter";
import type { CaseReducer, PayloadAction } from "@reduxjs/toolkit";
type RemoveIncomingReducer = CaseReducer<CallState, PayloadAction<string>>;

const removeIncomingCallAction: RemoveIncomingReducer = (state, action) => {
  const callId = action.payload;
  callsAdapter.removeOne(state, callId);
};

export default removeIncomingCallAction;
