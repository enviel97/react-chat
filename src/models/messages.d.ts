type MessageAction = "New" | "Edited" | "Removed" | "Seen" | "Notice";

interface MessageAttachments extends TimeStamp, Identity {
  downloadLink: string;
  publicId: string;
  type: string;
  originName: string;
  size: number;
}

interface IMessage extends TimeStamp, Identity {
  conversationId: string;
  author: string;
  action: MessageAction;
  // content
  content?: string;
  attachments?: MessageAttachments[];
}

interface Message extends TimeStamp, Identity {
  conversationId: string;
  author: User;
  action: MessageAction;

  // content
  content?: string;
  attachments?: MessageAttachments[];
}
