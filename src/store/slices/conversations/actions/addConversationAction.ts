import { PayloadAction } from "@reduxjs/toolkit";
import { ConversationState } from "@store/slices/state/conversation";
import { getAdapterConversation } from "../utils/getAdapterConversation.";
interface ActionAddConversation {
  conversation: Conversation;
  type: ConversationType;
}

export const addConversationAction = (
  state: ConversationState,
  action: PayloadAction<ActionAddConversation>
) => {
  const payload = action.payload;
  const conversation = payload.conversation;
  if (conversation.type === payload.type) {
    const { adapter, state: eState } = getAdapterConversation(
      state,
      conversation.type
    );
    adapter.upsertOne(eState, conversation);
  }
};
