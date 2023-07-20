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
    receiverId: user.id,
    name: user.name,
    avatar: user.avatar,
    type: callType,
  });
};

export default addIncomingCallAction;
