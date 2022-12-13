import { createAsyncThunk } from "@reduxjs/toolkit";
import { getConversation, getConversations } from "./api";

export const fetchConversations = createAsyncThunk(
  "conversations/list",
  async () => await getConversations()
);

export const fetchConversation = createAsyncThunk(
  "conversations/detail",
  async (id: string) => await getConversation(id)
);
