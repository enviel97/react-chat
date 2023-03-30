import client from "@core/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { USER_GET_SEARCH_FRIENDS } from "@store/common/repo";
import axios from "axios";
interface Request {
  query: string;
}
const fetchSearchFriend = createAsyncThunk(
  "user/profiles/search",
  async (query: string, { signal }) => {
    const source = axios.CancelToken.source();
    signal.addEventListener("abort", () => {
      source.cancel();
    });

    const response = await client.get<Request, Response<UserProfile[]>>(
      USER_GET_SEARCH_FRIENDS,
      { params: { query }, cancelToken: source.token }
    );
    return response.data ?? [];
  }
);

export default fetchSearchFriend;
