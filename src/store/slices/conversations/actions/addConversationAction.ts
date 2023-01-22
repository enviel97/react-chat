import { PayloadAction } from "@reduxjs/toolkit";
import getAdapterConversation from "../utils/getAdapterConversation.";

export const addConversationAction = (
  state: any,
  action: PayloadAction<Conversation>
) => {
  const adapter = getAdapterConversation(state);
  return adapter.upsertOne(state, action);
};
