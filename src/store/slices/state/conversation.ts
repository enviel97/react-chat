import { ActionReducerMapBuilder, EntityState } from "@reduxjs/toolkit";
import { State } from "@store/common/state";

export interface ConversationState {
  direct: EntityState<Conversation>;
  group: EntityState<Conversation>;
  process: State;
  type: "direct" | "group";
}

export type ConversationExtraBuilder =
  ActionReducerMapBuilder<ConversationState>;
