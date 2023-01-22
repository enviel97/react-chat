import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateLastMessage } from "@store/slices/conversations";
import { deleteMessage, getMessages, postMessage, updateMessage } from "./api";

export const fetchAddMessages = createAsyncThunk(
  "messages/create",
  async (request: RequestSendMessage, { dispatch }) => {
    const result = await postMessage(request);
    if (result.data) {
      const message = result.data;
      dispatch(
        updateLastMessage({
          conversationId: message.conversationId,
          message,
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
  async (request: RequestDeleteMessage, { dispatch }) => {
    const result = await deleteMessage(request);
    if (result.data) {
      const data = result.data;
      dispatch(
        updateLastMessage({
          conversationId: data.conversationId,
          message: data.lastMessage,
        })
      );
    }

    return result;
  }
);

export const fetchEditMessages = createAsyncThunk(
  "messages/edit",
  async (request: RequestEditMessage, { dispatch }) => {
    const result = await updateMessage(request);
    if (result.data) {
      const data = result.data;
      dispatch(
        updateLastMessage({
          conversationId: data.conversationId,
          message: data.lastMessage,
        })
      );
    }

    return result;
  }
);
