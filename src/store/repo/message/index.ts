import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteMessage, getMessages, postMessage } from "./api";

export const fetchAddMessages = createAsyncThunk(
  "messages/fetch-post-message",
  async (request: RequestSendMessage) => await postMessage(request)
);

export const fetchMessages = createAsyncThunk(
  "messages/fetch-get-messages",
  async (id: string) => await getMessages(id)
);

export const fetchDeleteMessages = createAsyncThunk(
  "messages/fetch-delete-messages",
  async (request: RequestDeleteMessage) => await deleteMessage(request)
);
