import { createSlice } from "@reduxjs/toolkit";
import { State } from "@store/common/state";
import conversationsAdapter from "./adapter/conversation.adapter";
import { updateLastMessageAction } from "./actions/updateLastMessageAction";
import SliceName from "@store/common/sliceName";
import groupConversationsAdapter from "./adapter/groupConversation.adapter";
import { addConversationAction } from "./actions/addConversationAction";
import { updateConversationAction } from "./actions/updateConversationAction";
import {
  fetchConversationsThunk,
  fetchAddConversationThunk,
  fetchAddMembersToConversationsThunk,
  fetchRemoveMembersFromConversationThunk,
} from "./extraReducer";
import { selectTypeConversationAction } from "./actions/selectTypeConversationAction";
import { ConversationState } from "../state/conversation";
import { removeConversationAction } from "./actions/removeConversationAction";

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
    updateConversation: updateConversationAction,
    removeConversation: removeConversationAction,
  },
  extraReducers: (builder) => {
    fetchConversationsThunk(builder);
    fetchAddConversationThunk(builder);
    fetchAddMembersToConversationsThunk(builder);
    fetchRemoveMembersFromConversationThunk(builder);
  },
});

export const {
  addConversation,
  updateLastMessage,
  selectedType,
  updateConversation,
  removeConversation,
} = conversationsSlice.actions;

export {
  selectAllConversation,
  selectConversationById,
} from "./selectors/getConversationSelector";

export default conversationsSlice.reducer;
