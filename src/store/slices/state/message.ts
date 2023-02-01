import { ActionReducerMapBuilder, EntityState } from "@reduxjs/toolkit";
import { State } from "@store/common/state";

export interface MessageInState extends Message {
  modified: State;
}
export interface MessageState extends EntityState<MessageInState> {
  process: State;
}

export type MessageExtraBuilder = ActionReducerMapBuilder<MessageState>;
