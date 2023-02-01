interface RequestSendMessage {
  tempId: string;
  conversationId: string;
  message: string;
}

interface RequestDeleteMessage {
  conversationId: string;
  messageId: string;
}
interface RequestEditMessage {
  conversationId: string;
  messageId: string;
  content: string;
}
