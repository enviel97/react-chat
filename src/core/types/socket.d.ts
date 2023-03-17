interface TypingPayload {
  userId: string;
  message: string;
}

interface StopTypingPayload {
  userId: string;
}

interface RemoveConversation {
  conversationId: string;
  type: "direct" | "group";
}

interface BannedMemberPayload {
  conversationId: string;
  bannedUser: string;
  type: "direct" | "group";
}
