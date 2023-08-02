import type { ActionReducerMapBuilder, EntityState } from "@reduxjs/toolkit";
import type { MediaConnection, Peer } from "peerjs";
/**
 * Call error define
 */

interface CallError {
  type: CallErrorType;
  message: string;
}

export interface CallState extends EntityState<CallModel> {
  /**
   * Local person
   */
  peer?: Peer;
  callId?: string;
  localStream?: MediaStream;
  mediaConnection?: MediaConnection;

  /**
   * Status
   */
  errorMess?: CallError;
}

export type CallExtraBuilder = ActionReducerMapBuilder<CallState>;
