import { createAsyncThunk } from "@reduxjs/toolkit";
import { getMessages, postMessage } from "./api";

export const fetchAddMessages = createAsyncThunk(
  "messages/addOne",
  async (request: RequestSendMessage) => await postMessage(request)
);

export const fetchMessages = createAsyncThunk(
  "messages/list",
  async (id: string) => await getMessages(id)
);
