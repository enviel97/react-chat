interface RequestCreateConversation {
  idParticipant: string[];
  message?: string;
}

interface UpdateLastMessageConversationPayload {
  conversationId: string;
  message?: Message;
}
