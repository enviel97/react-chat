import client from "@core/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { PROFILE_DETAIL } from "@store/common/repo";
import axios from "axios";

const fetchProfile = createAsyncThunk("user/profile", async (_, { signal }) => {
  const source = axios.CancelToken.source();
  signal.addEventListener("abort", () => {
    source.cancel();
  });
  const response = await client.get<any, Response<UserProfile>>(
    PROFILE_DETAIL,
    { cancelToken: source.token }
  );
  if (!response || !response.data) {
    return Promise.reject("Profile not found");
  }
  return response.data;
});

export default fetchProfile;
