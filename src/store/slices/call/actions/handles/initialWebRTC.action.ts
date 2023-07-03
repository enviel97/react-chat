import type { CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import type { CallState } from "@store/slices/state/call";
import Peer from "peerjs";
import { toast } from "react-toastify";

type InitialWebRTCCaseReducer = CaseReducer<CallState, PayloadAction<string>>;

const initialWebRTC: InitialWebRTCCaseReducer = (state, action) => {
  const payload = action.payload;
  if (!payload) {
    toast.error("Call server initial failure");
    return;
  }
  const peer = state.peer;
  if (!peer || peer.destroyed) {
    state.peer = new Peer(payload, {
      debug: import.meta.env.VITE_NODE_ENV === "dev" ? 3 : 0,
    });
    return;
  }
  if (peer.disconnected) peer.reconnect();
};

export default initialWebRTC;
