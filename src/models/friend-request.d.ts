type FriendRequestStatus = "Request" | "Accept" | "Reject";

interface FriendRequest extends Identity, TimeStamp {
  author: User;
  friend: User;
  status: FriendRequestStatus;
}
