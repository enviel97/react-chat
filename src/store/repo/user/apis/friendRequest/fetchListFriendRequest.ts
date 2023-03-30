import client from "@core/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { USER_GET_FRIEND_REQUESTS } from "@store/common/repo";
import axios from "axios";

const fetchListFriendRequest = createAsyncThunk(
  "user/friends-request/list",
  async (_: undefined, { signal }) => {
    const source = axios.CancelToken.source();
    signal.addEventListener("abort", () => source.cancel());
    const response = await client.get<undefined, Response<FriendRequest[]>>(
      USER_GET_FRIEND_REQUESTS,
      { cancelToken: source.token }
    );
    return response;
  }
);

export default fetchListFriendRequest;
