interface IMessage extends TimeStamp, Identity {
  conversationId: string;
  author: string;
  content: string;
}

interface Message extends TimeStamp, Identity {
  conversationId: string;
  author: User;
  content: string;
}
