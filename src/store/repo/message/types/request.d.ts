interface RequestSendMessage {
  tempId: string;
  conversationId: string;
  message: string;
  attachments?: File[];
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

interface RequestFetchMessage {
  conversationId: string;
  options?: PaginationOption;
}
