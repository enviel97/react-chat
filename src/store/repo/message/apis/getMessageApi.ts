import client from "@core/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { MESSAGE_GET_LIST } from "@store/common/repo";
import axios from "axios";

const fetchMessages = createAsyncThunk(
  "messages/list",
  async (
    {
      conversationId,
      options = {
        limit: 20,
        bucket: 0,
      },
    }: RequestFetchMessage,
    { signal }
  ) => {
    const source = axios.CancelToken.source();
    signal.addEventListener("abort", () => {
      source.cancel();
    });
    const response = await client.get<any, Response<Pagination<Message>>>(
      MESSAGE_GET_LIST,
      {
        params: options,
        pathVariable: { conversationId },
        cancelToken: source.token,
      }
    );
    if (response?.data) return response;
    throw new Error("Internal Server Error");
  }
);

export default fetchMessages;
