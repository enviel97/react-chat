type TabFriendUrl = "list" | "request" | "profile";

export interface UiState {
  selectedConversationType: ConversationType;
  tabFriendSelect: TabFriendUrl;
  totalFriendRequest: number;
}
