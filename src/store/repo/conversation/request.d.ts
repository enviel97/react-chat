interface RequestCreateConversation {
  emailParticipant: string;
  message?: string;
}

interface UpdateLastMessageConversationPayload {
  conversationId: string;
  message: Message;
}
