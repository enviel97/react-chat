interface ActionEditParams {
  messageId: string;
  content: string;
}

interface ResponseEditMessage extends ActionEditParams {
  conversationId: string;
  lastMessage?: Message;
}
interface ResponseDeleteMessage extends ActionEditParams {
  conversationId: string;
  lastMessage?: Message;
}
