import { PayloadAction } from "@reduxjs/toolkit";
import { ConversationState } from "@store/slices/state/conversation";
import { getAdapterConversation } from "../utils/getAdapterConversation.";

export const removeConversationAction = (
  state: ConversationState,
  action: PayloadAction<RemoveConversation>
) => {
  const payload = action.payload;
  const { adapter, state: eState } = getAdapterConversation(
    state,
    payload.type
  );
  adapter.removeOne(eState, payload.conversationId);
};
