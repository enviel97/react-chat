import { createAsyncThunk } from "@reduxjs/toolkit";
import { getConversations } from "./api";

export const fetchConversations = createAsyncThunk(
  "conversations/fetch-get-conversations",
  async () => await getConversations()
);
