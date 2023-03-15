type MessageAction = "New" | "Edited" | "Removed" | "Seen" | "Notice";

interface IMessage extends TimeStamp, Identity {
  conversationId: string;
  author: string;
  content: string;
  action: MessageAction;
}

interface Message extends TimeStamp, Identity {
  conversationId: string;
  author: User;
  content: string;
  action: MessageAction;
}
