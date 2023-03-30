import client from "@core/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { USER_POST_SEND_FRIEND_REQUEST } from "@store/common/repo";
import axios from "axios";

interface Request {
  userId: string;
}

const fetchSendFriendRequest = createAsyncThunk(
  "user/friend-request/request",
  async (friendId: string, { signal }) => {
    const source = axios.CancelToken.source();
    signal.addEventListener("abort", () => source.cancel());
    const response = await client.post<Request, Response<FriendRequest>>(
      USER_POST_SEND_FRIEND_REQUEST,
      { userId: friendId },
      { cancelToken: source.token }
    );
    if (!response.data) {
      return Promise.reject(response.message ?? "Interval Response Error");
    }
    return response.data;
  }
);

export default fetchSendFriendRequest;
