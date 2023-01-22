import { PayloadAction } from "@reduxjs/toolkit";
import { ConversationState } from "@store/slices/state/conversation";

type ConversationType = "direct" | "group";

export const selectTypeConversationAction = (
  state: ConversationState,
  action: PayloadAction<ConversationType>
) => {
  const type = action.payload;
  state.type = type;
};
