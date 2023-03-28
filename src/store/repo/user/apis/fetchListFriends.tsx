import client from "@core/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { USER_GET_FRIENDS } from "@store/common/repo";

const fetchListFriend = createAsyncThunk("user/friends", async () => {
  const response = await client.get<undefined, Response<UserProfile[]>>(
    USER_GET_FRIENDS
  );
  return response;
});

export default fetchListFriend;
