import { createSlice } from "@reduxjs/toolkit";
import SliceName from "@store/common/sliceName";
import { UiState } from "../state/ui";
import { updateTypeConversationActions } from "./actions";

export const uiSlice = createSlice({
  name: SliceName.ui,
  initialState: {
    selectedConversationType: "direct",
  } as UiState,
  reducers: {
    updateTypeConversation: updateTypeConversationActions,
  },
});

export const { updateTypeConversation } = uiSlice.actions;

export { default as selectConversationType } from "./selector/getTypeConversation";

export default uiSlice.reducer;
