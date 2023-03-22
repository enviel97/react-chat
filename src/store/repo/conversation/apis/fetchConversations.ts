import client from "@core/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { CONVERSATION_GET_LIST } from "@store/common/repo";
import { RootState } from "@store/index";

const getConversations = async (type: "direct" | "group") => {
  const response = await client.get<any, Response<Conversation[]>>(
    CONVERSATION_GET_LIST,
    { params: { type } }
  );
  return response;
};

const fetchConversations = createAsyncThunk(
  "conversations/list",
  async (_, { getState }) => {
    const state = getState() as RootState;
    const type = state.ui.selectedConversationType;
    const result = await getConversations(type);
    return {
      conversations: result,
      type,
    };
  }
);

export default fetchConversations;
