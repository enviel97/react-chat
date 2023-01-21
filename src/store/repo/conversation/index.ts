import { createAsyncThunk } from "@reduxjs/toolkit";
import { createConversation, getConversations } from "./api";

export const fetchDirectConversations = createAsyncThunk(
  "conversations/list-direct",
  async () => await getConversations("direct")
);

export const fetchGroupConversations = createAsyncThunk(
  "conversations/list-group",
  async () => await getConversations("group")
);

export const fetchAddConversation = createAsyncThunk(
  "conversations/fetch-post-conversations",
  async (req: RequestCreateConversation) => await createConversation(req)
);
