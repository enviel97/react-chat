import client from "@core/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { CONVERSATION_GET_LIST } from "@store/common/repo";
import axios from "axios";

const fetchConversations = createAsyncThunk(
  "conversations/list",
  async (type: ConversationType, { signal }) => {
    const source = axios.CancelToken.source();
    signal.addEventListener("abort", () => {
      source.cancel();
    });
    const result = await client.get<any, Response<Conversation[]>>(
      CONVERSATION_GET_LIST,
      { params: { type }, cancelToken: source.token }
    );
    return {
      conversations: result,
      type,
    };
  }
);

export default fetchConversations;
