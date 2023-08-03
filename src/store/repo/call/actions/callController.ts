import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "@store/index";
import type { Peer } from "peerjs";
import { getPeer } from "../utils/callController";
import { devicesPermission } from "../utils/devicesPermission";

interface BeginCallResponse {
  localStream: MediaStream;
  peer: Peer;
}

/**
 * Prepare to initiate a call such as create new webRTC services or reconnect it
 */
export const beginCall = createAsyncThunk<BeginCallResponse>(
  "call/start",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const [peer, stream] = await Promise.all([
        getPeer(state),
        devicesPermission({ camera: true, microphone: true }),
      ]);
      // trigger
      return { localStream: stream, peer: peer };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const endedCall = createAsyncThunk(
  "call/ended",
  async (callId: string, { getState }) => {
    const state = getState() as RootState;
    const callState = state.call;
    const incomingCall = callState.entities[callId];
    await callState.localStream?.close();
    callState.mediaConnection?.close();
    return { callId, connecterId: incomingCall?.connecterId };
  }
);
