import { PayloadAction } from "@reduxjs/toolkit";
import { ConversationState } from "@store/slices/state/conversation";
import moment from "moment";
import { getAdapterConversation } from "../utils/getAdapterConversation.";
interface ActionUpdateLastMessageConversation
  extends UpdateLastMessageConversationPayload {
  type: ConversationType;
}
const validateLastMessage = (conversation: Conversation, message: Message) => {
  const { lastMessage } = conversation;
  if (!lastMessage) return false;
  return (
    // message edit is not last message
    (lastMessage.isSame(message) &&
      ["Edited", "Removed"].includes(message.action)) ||
    // message is new
    message.action === "New"
  );
};

export const updateLastMessageAction = (
  state: ConversationState,
  action: PayloadAction<ActionUpdateLastMessageConversation>
) => {
  const { message, conversationId, type } = action.payload;
  if (!message || message?.action === "Notice") {
    return;
  }
  const { author, ...updated } = message;
  const entities = getAdapterConversation(state, type);
  const { adapter, state: eState } = entities;
  const conversation = eState.entities[conversationId];
  if (!conversation) return;
  if (!validateLastMessage(conversation, message)) {
    return;
  }
  adapter.updateOne(eState, {
    id: conversationId,
    changes: {
      lastMessage: { ...conversation.lastMessage!, ...updated },
      updatedAt: message?.updatedAt ?? moment().toISOString(),
    },
  });
};
