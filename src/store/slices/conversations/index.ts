import { createSlice } from "@reduxjs/toolkit";
import { State } from "@store/common/state";
import conversationsAdapter from "./adapter/conversation.adapter";
import { updateLastMessageAction } from "./actions/updateLastMessageAction";
import SliceName from "@store/common/sliceName";
import groupConversationsAdapter from "./adapter/groupConversation.adapter";
import { addConversationAction } from "./actions/addConversationAction";
import { fetchConversationsThunk } from "./extraReducer/fetchConversationsThunk";
import { selectTypeConversationAction } from "./actions/selectTypeConversationAction";
import { ConversationState } from "../state/conversation";
import { fetchAddConversationThunk } from "./extraReducer/fetchAddConversationThunk";

export const conversationsSlice = createSlice({
  name: SliceName.conversation,
  initialState: {
    direct: conversationsAdapter.getInitialState(),
    group: groupConversationsAdapter.getInitialState(),
    process: State.IDLE,
    type: "direct",
  } as ConversationState,
  reducers: {
    addConversation: addConversationAction,
    updateLastMessage: updateLastMessageAction,
    selectedType: selectTypeConversationAction,
  },
  extraReducers: (builder) => {
    fetchConversationsThunk(builder);
    fetchAddConversationThunk(builder);
  },
});

export const { addConversation, updateLastMessage, selectedType } =
  conversationsSlice.actions;

export {
  selectAllConversation,
  selectConversationById,
} from "./selectors/getConversationSelector";

export default conversationsSlice.reducer;
