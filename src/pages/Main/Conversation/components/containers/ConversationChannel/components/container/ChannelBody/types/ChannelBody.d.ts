interface MessageRemovePayload {
  lastMessage: Message;
  conversationId: string;
  messageId: string;
}

interface MessageEditedPayload {
  lastMessage: Message;
  conversationId: string;
  messageId: string;
  content: string;
}
