interface ActionEditParams extends Message {
  id: string;
  content: string;
  conversationId: string;
  action: "Edited" | "Removed";
}
