type ConversationType = "group" | "direct";

interface CommonConversation {
  name: string;
  type: ConversationType;
}

interface IConversation extends Identity, TimeStamp, CommonConversation {
  participant: string;
  lastMessage?: string;
}

interface Conversation extends Identity, TimeStamp, CommonConversation {
  participant: Participant;
  lastMessage?: Message;
}

interface ConversationDetail extends Identity, TimeStamp, Conversation {
  messages: Message[];
}
