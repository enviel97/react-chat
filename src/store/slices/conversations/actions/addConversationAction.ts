import { PayloadAction } from "@reduxjs/toolkit";
import { ConversationState } from "@store/slices/state/conversation";
import { getAdapterConversation } from "../utils/getAdapterConversation.";

export const addConversationAction = (
  state: ConversationState,
  action: PayloadAction<Conversation>
) => {
  const members = action.payload.participant.members;
  if (members.length <= 2 && state.type === "direct") {
    const { adapter, state: eState } = getAdapterConversation(state, "direct");
    adapter.upsertOne(eState, action);
  }
  if (members.length < 2 && state.type === "group") {
    const { adapter, state: eState } = getAdapterConversation(state, "group");
    adapter.upsertOne(eState, action);
  }
};
