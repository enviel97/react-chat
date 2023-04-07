type UserProviderState = {
  onlineIds: Set<string>;
  offlineIds: Set<string>;
  friends: Map<string, UserProfile>;
};

type FriendListStatus = {
  online: string[];
  offline: string[];
  listFriend: UserProfile[];
};

type SwapStatusPayload = {
  id: string;
  status: "online" | "offline";
};

// Actions
type UPDATE_ONLINE = { type: "update.online"; payload: string[] };
type UPDATE_OFFLINE = { type: "update.offline"; payload: string[] };
type SWAP_STATUS = { type: "update.swap"; payload: SwapStatusPayload };
type SET_FRIEND_LIST = { type: "update.friends"; payload: UserProfile[] };

type UseProviderAction =
  | UPDATE_ONLINE
  | UPDATE_OFFLINE
  | SWAP_STATUS
  | SET_FRIEND_LIST;
