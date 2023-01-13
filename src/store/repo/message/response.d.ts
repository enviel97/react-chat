interface ResponseDeleteMessage {
  conversationId: string;
  messageId: string;
  lastMessage?: Message;
}

interface ActionEditParams {
  messageId: string;
  content: string;
}

interface ResponseEditMessage extends ActionEditParams {
  conversationId: string;
  lastMessage?: Message;
}
