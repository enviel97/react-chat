import { PayloadAction } from "@reduxjs/toolkit";
import { ConversationState } from "@store/slices/state/conversation";
import string from "@utils/string";
import { getAdapterConversation } from "../utils/getAdapterConversation.";

export const updateConversationAction = (
  state: ConversationState,
  action: PayloadAction<Conversation>
) => {
  const payload = action.payload;
  if (payload.type === "direct" && state.type === "direct") {
    const { adapter, state: eState } = getAdapterConversation(state, "direct");

    adapter.updateOne(eState, {
      id: string.getId(payload),
      changes: { ...payload },
    });
  }
  if (payload.type === "group" && state.type === "group") {
    const { adapter, state: eState } = getAdapterConversation(state, "group");
    console.log(payload);
    adapter.updateOne(eState, {
      id: string.getId(payload),
      changes: { ...payload },
    });
  }
};
