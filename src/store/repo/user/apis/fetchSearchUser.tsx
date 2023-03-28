import client from "@core/api";
import { USER_GET_SEARCH } from "@store/common/repo";
import { createAsyncThunk } from "@reduxjs/toolkit";

const fetchSearchUser = createAsyncThunk(
  "users/search",
  async (participant: string) => {
    const response = await client.get<any, Response<User[]>>(USER_GET_SEARCH, {
      params: { participant: participant },
    });
    return response;
  }
);
export default fetchSearchUser;
