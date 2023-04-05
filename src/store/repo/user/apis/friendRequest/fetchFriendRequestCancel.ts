import client from "@core/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { USER_DELETE_FRIEND_REQUEST_CANCEL } from "@store/common/repo";
import axios from "axios";

const fetchFriendRequestCancel = createAsyncThunk(
  "user/friends-request/cancel",
  async (friendRequestId: string, { signal }) => {
    const source = axios.CancelToken.source();
    signal.addEventListener("abort", () => source.cancel());
    const response = await client.delete<undefined, Response<string>>(
      USER_DELETE_FRIEND_REQUEST_CANCEL,
      { cancelToken: source.token, pathVariable: { id: friendRequestId } }
    );
    return response;
  }
);

export default fetchFriendRequestCancel;
