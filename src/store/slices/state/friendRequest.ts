import { State } from "@store/common/state";
import { ActionReducerMapBuilder, EntityState } from "@reduxjs/toolkit";

export interface FriendRequestState extends EntityState<FriendRequest> {
  process: State;
}

export type FriendRequestExtraBuilder =
  ActionReducerMapBuilder<FriendRequestState>;
