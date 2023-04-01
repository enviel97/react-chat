import fetchFriendRequestResponse from "@store/repo/user/apis/friendRequest/fetchFriendRequestResponse";
import { FriendRequestExtraBuilder } from "@store/slices/state/friendRequest";
import userFriendRequestAdapter from "../adapter/friendRequest.adapter";

const fetchFriendRequestResponseThunk = (
  builder: FriendRequestExtraBuilder
) => {
  builder.addCase(fetchFriendRequestResponse.fulfilled, (state, action) => {
    const { data } = action.payload;
    userFriendRequestAdapter.removeOne(state, data);
  });
};

export default fetchFriendRequestResponseThunk;
