import type { ActionReducerMapBuilder, EntityState } from "@reduxjs/toolkit";
import type { MediaConnection, Peer } from "peerjs";

export interface CallState extends EntityState<CallModel> {
  /**
   * Local person
   */
  peer?: Peer;
  callId: string | null;
  mediaConnection: MediaConnection | null;
  localStream: MediaStream | null;
}

export type CallExtraBuilder = ActionReducerMapBuilder<CallState>;
