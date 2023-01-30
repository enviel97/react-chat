import { current, PayloadAction } from "@reduxjs/toolkit";
import { ConversationState } from "@store/slices/state/conversation";
import moment from "moment";
import getAdapterConversation from "../utils/getAdapterConversation.";

export const updateLastMessageAction = (
  state: ConversationState,
  action: PayloadAction<UpdateLastMessageConversationPayload>
) => {
  const payload = action.payload;
  if (payload.message === null) return;
  const { adapter, state: eState } = getAdapterConversation(state);

  const conversation = adapter
    .getSelectors()
    .selectById(eState, payload.conversationId);

  if (!conversation) return;
  adapter.updateOne(eState, {
    id: payload.conversationId,
    changes: {
      lastMessage: payload.message,
      updatedAt: payload.message?.updatedAt ?? moment().toISOString(),
    },
  });
};
