import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/index";
import { updateLastMessage } from "@store/slices/conversations";
import { deleteMessage, getMessages, postMessage, updateMessage } from "./api";

export const fetchAddMessages = createAsyncThunk(
  "messages/create",
  async (request: RequestSendMessage, { dispatch, getState }) => {
    const result = await postMessage(request);
    const state = getState() as RootState;
    const type = state.ui.selectedConversationType;
    if (result.data) {
      const message = result.data;
      dispatch(
        updateLastMessage({
          conversationId: message.conversationId,
          message,
          type,
        })
      );
    }

    return result;
  }
);

export const fetchMessages = createAsyncThunk(
  "messages/list",
  async (id: string) => await getMessages(id)
);

export const fetchDeleteMessages = createAsyncThunk(
  "messages/delete",
  async (request: RequestDeleteMessage, { dispatch, getState }) => {
    const result = await deleteMessage(request);
    const state = getState() as RootState;
    const type = state.ui.selectedConversationType;
    if (result.data) {
      const data = result.data;
      dispatch(
        updateLastMessage({
          conversationId: data.conversationId,
          message: data.lastMessage,
          type,
        })
      );
    }

    return result;
  }
);

export const fetchEditMessages = createAsyncThunk(
  "messages/edit",
  async (request: RequestEditMessage, { dispatch, getState }) => {
    const result = await updateMessage(request);
    const state = getState() as RootState;
    const type = state.ui.selectedConversationType;
    if (result.data) {
      const data = result.data;
      dispatch(
        updateLastMessage({
          conversationId: data.conversationId,
          message: data.lastMessage,
          type,
        })
      );
    }

    return result;
  }
);
