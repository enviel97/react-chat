interface RequestSendMessage {
  conversationId: string;
  message: string;
}

interface RequestDeleteMessage {
  conversationId: string;
  messageId: string;
}
