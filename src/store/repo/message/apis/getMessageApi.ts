import local from "@common/local.define";
import client from "@core/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { MESSAGE_GET_LIST } from "@store/common/repo";
import axios from "axios";

const DEFAULT_PAGINATION = local.variable.pagination;
const fetchMessages = createAsyncThunk(
  "messages/list",
  async (
    { conversationId, options = DEFAULT_PAGINATION }: RequestFetchMessage,
    { signal, rejectWithValue }
  ) => {
    const source = axios.CancelToken.source();
    signal.addEventListener("abort", () => {
      source.cancel();
    });
    const response = await client
      .get<any, Response<Pagination<Message>>>(MESSAGE_GET_LIST, {
        params: options,
        pathVariable: { conversationId },
        cancelToken: source.token,
      })
      // Throw error
      .catch((error) => rejectWithValue(error));

    return response;
  }
);

export default fetchMessages;
