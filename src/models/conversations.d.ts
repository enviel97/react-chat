interface IConversation extends Identity, TimeStamp {
  participant: string;
  lastMessage?: string;
}

interface Conversation extends Identity, TimeStamp {
  participant: Participant;
  lastMessage?: Message;
}

interface ConversationDetail extends Identity, TimeStamp, Conversation {
  messages: Message[];
}
