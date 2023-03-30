type FriendRequestStatus = "Request" | "Accept" | "Reject";

interface FriendRequest extends Identity, TimeStamp {
  user: UserProfile;
  status: FriendRequestStatus;
}
