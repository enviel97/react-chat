interface RequestCreateConversation {
  idParticipant: string[];
  message?: string;
}

interface UpdateLastMessageConversationPayload {
  conversationId: string;
  message?: Message;
}

interface RequestAddMemberConversation {
  idParticipant: string[];
  conversationId: string;
}
