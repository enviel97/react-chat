import type { ActionReducerMapBuilder, EntityState } from "@reduxjs/toolkit";
import type Peer from "peerjs";
import type { MediaConnection } from "peerjs";

export interface CallModel {
  caller: string;
  type: CallType;
  readonly connection: MediaConnection;
  readonly createdAt: string;
}

export interface CallState extends EntityState<CallModel> {
  currentConnectChannel?: string;
  peer?: Peer;
  name?: string;
  avatar?: string;
}

export type CallExtraBuilder = ActionReducerMapBuilder<CallState>;
