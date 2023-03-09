interface IMessage extends TimeStamp, Identity {
  conversationId: string;
  author: string;
  content: string;
  action: "New" | "Edited" | "Removed";
}

interface Message extends TimeStamp, Identity {
  conversationId: string;
  author: User;
  content: string;
  action: "New" | "Edited" | "Removed";
}
