import { PayloadAction } from "@reduxjs/toolkit";
import { ConversationState } from "@store/slices/state/conversation";
import moment from "moment";
import { getAdapterConversation } from "../utils/getAdapterConversation.";
interface ActionUpdateLastMessageConversation
  extends UpdateLastMessageConversationPayload {
  type: ConversationType;
}
export const updateLastMessageAction = (
  state: ConversationState,
  action: PayloadAction<ActionUpdateLastMessageConversation>
) => {
  const payload = action.payload;
  if (
    payload.message === null ||
    (payload.message && payload.message?.action === "Notice")
  )
    return;
  const { adapter, state: eState } = getAdapterConversation(
    state,
    payload.type
  );

  const conversation = adapter
    .getSelectors()
    .selectById(eState, payload.conversationId);

  if (!conversation || !payload.message) return;
  adapter.updateOne(eState, {
    id: payload.conversationId,
    changes: {
      lastMessage: payload.message,
      updatedAt: payload.message?.updatedAt ?? moment().toISOString(),
    },
  });
};
