import { PayloadAction } from "@reduxjs/toolkit";
import { ConversationState } from "@store/slices/state/conversation";
import string from "@utils/string";
import { getAdapterConversation } from "../utils/getAdapterConversation.";

export const updateConversationAction = (
  state: ConversationState,
  action: PayloadAction<Conversation>
) => {
  const conversation = action.payload;
  if (conversation.type === state.type) {
    const { adapter, state: eState } = getAdapterConversation(
      state,
      conversation.type
    );
    adapter.upsertOne(eState, action);
  }
};
