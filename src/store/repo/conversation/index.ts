import { createAsyncThunk } from "@reduxjs/toolkit";
import { getConversations } from "./api";

export const fetchConversations = createAsyncThunk(
  "conversations/list",
  async () => await getConversations()
);
