import { PayloadAction } from "@reduxjs/toolkit";
import { ConversationState } from "@store/slices/state/conversation";
import string from "@utils/string";
import { getAdapterConversation } from "../utils/getAdapterConversation.";

export const updateConversationAction = (
  state: ConversationState,
  action: PayloadAction<Conversation>
) => {
  const members = action.payload.participant.members;
  if (members.length <= 2 && state.type === "direct") {
    const { adapter, state: eState } = getAdapterConversation(state, "direct");
    adapter.updateOne(eState, {
      id: string.getId(action.payload),
      changes: { ...action.payload },
    });
  }
  if (members.length > 2 && state.type === "group") {
    const { adapter, state: eState } = getAdapterConversation(state, "group");
    adapter.updateOne(eState, {
      id: string.getId(action.payload),
      changes: { ...action.payload },
    });
  }
};
