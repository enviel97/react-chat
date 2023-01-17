interface IConversation extends Identity, TimeStamp {
  participant: string;
  author: string;
  lastMessage?: string;
}

interface Conversation extends Identity, TimeStamp {
  participant: Participant;
  author: User;
  lastMessage?: Message;
}

interface ConversationDetail extends Identity, TimeStamp, Conversation {
  messages: Message[];
}
