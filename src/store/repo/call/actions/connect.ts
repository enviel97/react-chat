import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "@store/index";
import Peer from "peerjs";

const getPeer = (state: RootState) => {
  return new Promise<Peer>((resolve, reject) => {
    const peer = state.call.peer;
    if (!peer || peer.destroyed) {
      const id = state.profile.user?.getId();
      if (!id) return reject("auth-unavailable");
      return resolve(new Peer(id));
    }
    if (peer.disconnected) peer.reconnect();
    return resolve(peer);
  });
};

const connect = createAsyncThunk("call/connect", async (_, { getState }) => {
  const state = getState() as RootState;
  const peer = await getPeer(state);
  return peer;
});

export default connect;
