import type { CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import type { CallState } from "@store/slices/state/call";
import type { MediaConnection } from "peerjs";
import callsAdapter from "../adapter/call.adapter";

interface CallModelCreate {
  receiver: string;
  connection: MediaConnection;
  createdAt: Date;
}

type AddCallActionReducer = CaseReducer<
  CallState,
  PayloadAction<CallModelCreate>
>;

const addCallAction: AddCallActionReducer = (state, action) => {
  const payload = action.payload;
  callsAdapter.addOne(state as any, {
    receiver: payload.receiver,
    connection: payload.connection as any,
    createdAt: payload.createdAt.toISOString(),
  });
};

export default addCallAction;
