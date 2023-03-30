import { createSlice } from "@reduxjs/toolkit";
import { State } from "@store/common/state";
import SliceName from "@store/common/sliceName";
import messagesAdapter from "./adapter/message.adapter";
import { addMessageAction } from "./actions/addMessageActions";
import { removeMessageAction } from "./actions/removeMessageAction";
import { editMessageAction } from "./actions/editMessageActions";
import { fetchMessageThunk } from "./extraReducer/fetchMessagesThunk";
import { fetchAddMessageThunk } from "./extraReducer/fetchAddMessageThunk";
import { fetchDeleteMessageThunk } from "./extraReducer/fetchDeleteMessageThunk";
import { fetchEditMessageThunk } from "./extraReducer/fetchEditMessageThunk";
import { MessageState } from "../state/message";

export const messagesSlice = createSlice({
  name: SliceName.message,
  initialState: messagesAdapter.getInitialState({
    process: State.IDLE,
  }) as MessageState,
  reducers: {
    addMessages: addMessageAction,
    removeMessage: removeMessageAction,
    editMessage: editMessageAction,
  },
  extraReducers: (builder) => {
    fetchMessageThunk(builder);
    fetchAddMessageThunk(builder);
    fetchDeleteMessageThunk(builder);
    fetchEditMessageThunk(builder);
  },
});

export const { addMessages, removeMessage, editMessage } =
  messagesSlice.actions;

export const { selectById: selectMessageById, selectAll: selectAllMessage } =
  messagesAdapter.getSelectors((state: any) => state[SliceName.message]);

export default messagesSlice.reducer;
