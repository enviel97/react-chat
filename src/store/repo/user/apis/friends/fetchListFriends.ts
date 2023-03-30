import client from "@core/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { USER_GET_FRIENDS } from "@store/common/repo";
import axios from "axios";

const fetchListFriend = createAsyncThunk(
  "user/profiles",
  async (_, { signal }) => {
    const source = axios.CancelToken.source();
    signal.addEventListener("abort", () => {
      source.cancel();
    });
    const response = await client.get<undefined, Response<UserProfile[]>>(
      USER_GET_FRIENDS,
      { cancelToken: source.token }
    );
    return response;
  }
);

export default fetchListFriend;
