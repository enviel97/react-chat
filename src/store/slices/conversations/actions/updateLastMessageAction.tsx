import { PayloadAction } from "@reduxjs/toolkit";
import moment from "moment";
import getAdapterConversation from "../utils/getAdapterConversation.";

export const updateLastMessageAction = (
  state: any,
  action: PayloadAction<UpdateLastMessageConversationPayload>
) => {
  const payload = action.payload;
  if (payload.message === null) return;
  const adapter = getAdapterConversation(state);
  const conversation = adapter
    .getSelectors()
    .selectById(state, payload.conversationId);

  if (!conversation) return;
  adapter.updateOne(state, {
    id: payload.conversationId,
    changes: {
      lastMessage: payload.message,
      updatedAt: payload.message?.updatedAt ?? moment().toISOString(),
    },
  });
};
