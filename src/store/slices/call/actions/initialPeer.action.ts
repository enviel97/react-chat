import { PayloadAction } from "@reduxjs/toolkit";
import type { CallState } from "@store/slices/state/call";
import Peer from "peerjs";

const initialPeerAction = (state: CallState, action: PayloadAction<string>) => {
  const peer = state.peer;
  if (peer && !peer.destroyed) return;
  if (!peer) {
    state.peer = new Peer(action.payload);
    return;
  }
  if (peer.disconnected) peer.reconnect();
};

export default initialPeerAction;
