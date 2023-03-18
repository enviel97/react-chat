type ConversationType = "group" | "direct";

interface IConversation extends Identity, TimeStamp {
  participant: string;
  type: ConversationType;
  lastMessage?: string;
}

interface Conversation extends Identity, TimeStamp {
  participant: Participant;
  lastMessage?: Message;
  type: ConversationType;
}

interface ConversationDetail extends Identity, TimeStamp, Conversation {
  messages: Message[];
}
