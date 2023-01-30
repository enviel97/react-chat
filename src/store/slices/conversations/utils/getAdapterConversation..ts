import { EntityState } from "@reduxjs/toolkit";
import { ConversationState } from "@store/slices/state/conversation";
import conversationsAdapter from "../adapter/conversation.adapter";
import groupConversationsAdapter from "../adapter/groupConversation.adapter";

interface IAdapter {
  adapter: typeof conversationsAdapter | typeof groupConversationsAdapter;
  state: EntityState<Conversation>;
}

const getAdapterConversation = (state: ConversationState): IAdapter => {
  let adapter =
    state.type === "direct" ? conversationsAdapter : groupConversationsAdapter;
  return { adapter: adapter, state: state[state.type] };
};

export default getAdapterConversation;
