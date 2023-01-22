import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/index";
import { createConversation, getConversations } from "./api";

export const fetchConversations = createAsyncThunk(
  "conversations/list",
  async (_, { getState }) => {
    const state: RootState = getState() as any;
    const type = state.conversation.type;
    const response = await getConversations(type);
    return response;
  }
);

export const fetchAddConversation = createAsyncThunk(
  "conversations/add",
  async (req: RequestCreateConversation) => await createConversation(req)
);
