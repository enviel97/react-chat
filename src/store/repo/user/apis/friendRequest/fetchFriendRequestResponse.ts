import client from "@core/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { USER_PATCH_FRIEND_REQUESTS_RESPONSE } from "@store/common/repo";
import type { RootState } from "@store/index";
import { updateTotalFriendRequest } from "@store/slices/ui";
import { addFriend } from "@store/slices/users";

interface Request {
  friendRequestId: string;
  status: FriendRequestStatus;
}

const fetchFriendRequestResponse = createAsyncThunk(
  "user/friend-request/accept",

  async ({ friendRequestId, status }: Request, { getState, dispatch }) => {
    const result = await client.patch<Request, Response<UserProfile>>(
      USER_PATCH_FRIEND_REQUESTS_RESPONSE,
      { status: status },
      { pathVariable: { friendRequestId } }
    );
    if (!result.data) return Promise.reject(result);
    if (status === "Accept") dispatch(addFriend(result.data));
    const state = getState() as RootState;
    dispatch(updateTotalFriendRequest(state.ui.totalFriendRequest - 1));
    return { data: friendRequestId, message: result.message };
  }
);

export default fetchFriendRequestResponse;
