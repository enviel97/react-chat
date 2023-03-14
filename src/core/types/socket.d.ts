interface TypingPayload {
  userId: string;
  message: string;
}

interface StopTypingPayload {
  userId: string;
}

interface BannedMemberPayload {
  conversationId: string;
  bannedUser: string;
  type: "direct" | "group";
}
