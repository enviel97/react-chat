import { createAsyncThunk } from "@reduxjs/toolkit";
import { createConversation, getConversations } from "./api";

export const fetchConversations = createAsyncThunk(
  "conversations/fetch-get-conversations",
  async (type: "group" | "direct") => await getConversations(type)
);

export const fetchAddConversation = createAsyncThunk(
  "conversations/fetch-post-conversations",
  async (req: RequestCreateConversation) => await createConversation(req)
);
