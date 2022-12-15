import { createAsyncThunk } from "@reduxjs/toolkit";
import { getMessages, postMessage } from "./api";

export const fetchAddMessages = createAsyncThunk(
  "messages/fetch-post-message",
  async (request: RequestSendMessage) => await postMessage(request)
);

export const fetchMessages = createAsyncThunk(
  "messages/fetch-get-messages",
  async (id: string) => await getMessages(id)
);
