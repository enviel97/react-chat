import type { CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import type { CallState } from "@store/slices/state/call";
import callsAdapter from "../adapter/call.adapter";

type AddIncomingActionReducer = CaseReducer<
  CallState,
  PayloadAction<IncomingCall>
>;

const addIncomingCallAction: AddIncomingActionReducer = (state, action) => {
  const { callId, callType, user } = action.payload;
  callsAdapter.upsertOne(state, {
    connectionId: callId,
    connecterId: user.id,
    name: user.name,
    avatar: user.avatar,
    type: callType,
    status: "calling",
  });
};

export default addIncomingCallAction;
