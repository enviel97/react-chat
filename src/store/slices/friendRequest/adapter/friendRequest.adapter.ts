import { createEntityAdapter } from "@reduxjs/toolkit";
import string from "@utils/string";

const userFriendRequestAdapter = createEntityAdapter<FriendRequest>({
  selectId: (friendReq) => string.getId(friendReq),
  sortComparer: (a, b) =>
    new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
});

export default userFriendRequestAdapter;
