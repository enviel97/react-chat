import { EntityState } from "@reduxjs/toolkit";
import { ConversationState } from "@store/slices/state/conversation";
import conversationsAdapter from "../adapter/conversation.adapter";
import groupConversationsAdapter from "../adapter/groupConversation.adapter";

interface IAdapter {
  adapter: typeof conversationsAdapter | typeof groupConversationsAdapter;
  state: EntityState<Conversation>;
}

export const getAdapterConversation = (
  state: ConversationState,
  type: "direct" | "group"
): IAdapter => {
  const adapter =
    type === "direct" ? conversationsAdapter : groupConversationsAdapter;
  return { adapter: adapter, state: state[type] };
};
