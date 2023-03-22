import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@store/index";

const selectTypeConversation = createSelector(
  (state: RootState) => state,
  (state) => state.ui.selectedConversationType
);

export default selectTypeConversation;
