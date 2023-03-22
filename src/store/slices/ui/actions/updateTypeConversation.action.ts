import { PayloadAction } from "@reduxjs/toolkit";
import { UiState } from "@store/slices/state/ui";

const updateTypeConversationActions = (
  state: UiState,
  action: PayloadAction<ConversationType>
) => {
  state.selectedConversationType = action.payload;
};

export default updateTypeConversationActions;
