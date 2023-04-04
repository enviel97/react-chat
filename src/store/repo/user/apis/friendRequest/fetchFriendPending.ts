import client from "@core/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { USER_PATCH_FRIEND_PENDING } from "@store/common/repo";
import axios from "axios";

const fetchFriendPending = createAsyncThunk(
  "user/friends-request/waiting",
  async (_: undefined, { signal }) => {
    const source = axios.CancelToken.source();
    signal.addEventListener("abort", () => source.cancel());
    const response = await client.get<undefined, Response<FriendRequest[]>>(
      USER_PATCH_FRIEND_PENDING,
      { cancelToken: source.token }
    );
    return response;
  }
);

export default fetchFriendPending;
