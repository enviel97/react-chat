import { ConversationState } from "@store/slices/state/conversation";
import conversationsAdapter from "../adapter/conversation.adapter";
import groupConversationsAdapter from "../adapter/groupConversation.adapter";

const getAdapterConversation = (state: ConversationState) => {
  if (state.type === "direct") return conversationsAdapter;
  return groupConversationsAdapter;
};

export default getAdapterConversation;
