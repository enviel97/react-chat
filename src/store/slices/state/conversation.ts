import { ActionReducerMapBuilder, EntityState } from "@reduxjs/toolkit";
import { State } from "@store/common/state";

export interface ConversationState {
  direct: EntityState<Conversation>;
  group: EntityState<Conversation>;
  process: State;
}
export interface ResponseThunkConversations {
  conversations: Response<Conversation[]>;
  type: ConversationType;
}
export interface ResponseThunkConversation {
  conversation: Response<Conversation>;
  type: ConversationType;
}

export type ConversationExtraBuilder =
  ActionReducerMapBuilder<ConversationState>;
