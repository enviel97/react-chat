import { createDraftSafeSelector } from "@reduxjs/toolkit";
import { RootState } from "@store/index";

const selectTypeConversation = createDraftSafeSelector(
  (state: RootState) => state,
  (state) => state.ui.selectedConversationType
);

export default selectTypeConversation;
