import type { ActionReducerMapBuilder, EntityState } from "@reduxjs/toolkit";
import type Peer from "peerjs";
import type { MediaConnection } from "peerjs";

export interface CallModel {
  receiver: string;
  readonly connection: MediaConnection;
  readonly createdAt: string;
}

export interface CallState extends EntityState<CallModel> {
  callAnswer?: string;
  peer?: Peer;
}

export type CallExtraBuilder = ActionReducerMapBuilder<CallState>;
