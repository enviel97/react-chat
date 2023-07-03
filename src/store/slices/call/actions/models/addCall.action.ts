import type { CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import type { CallState } from "@store/slices/state/call";
import type { MediaConnection } from "peerjs";
import callsAdapter from "../../adapter/call.adapter";

interface CallModelCreate {
  caller: string;
  connection: MediaConnection;
  type: CallType;
}

type AddCallActionReducer = CaseReducer<
  CallState,
  PayloadAction<CallModelCreate>
>;

const addCallAction: AddCallActionReducer = (state, action) => {
  const payload = action.payload;
  callsAdapter.addOne(state as any, {
    caller: payload.caller,
    connection: payload.connection as any,
    createdAt: new Date().toISOString(),
    type: payload.type,
  });
};

export default addCallAction;
