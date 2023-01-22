import { ActionReducerMapBuilder, EntityState } from "@reduxjs/toolkit";
import { State } from "@store/common/state";

export interface MessageState extends EntityState<Message> {
  process: State;
}

export type MessageExtraBuilder = ActionReducerMapBuilder<MessageState>;
