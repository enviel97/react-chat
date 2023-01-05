import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateLastMessage } from "@store/slices/conversationSlice";
import { deleteMessage, getMessages, postMessage } from "./api";

export const fetchAddMessages = createAsyncThunk(
  "messages/fetch-post-message",
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
  "messages/fetch-get-messages",
  async (id: string) => await getMessages(id)
);

export const fetchDeleteMessages = createAsyncThunk(
  "messages/fetch-delete-messages",
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
