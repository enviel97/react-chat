type FriendRequestStatus = "Request" | "Accept" | "Reject";

interface FriendRequest extends Identity, TimeStamp {
  authorId: string;
  authorProfile: UserProfile;

  friendId: string;
  friendProfile: UserProfile;
  status: FriendRequestStatus;
}
