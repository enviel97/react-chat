import { PayloadAction } from "@reduxjs/toolkit";
import getAdapterConversation from "../utils/getAdapterConversation.";

export const addConversationAction = (
  state: any,
  action: PayloadAction<Conversation>
) => {
  const { adapter, state: eState } = getAdapterConversation(state);
  adapter.upsertOne(eState, action);
};
