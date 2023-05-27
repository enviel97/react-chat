import useAuthenticate from "@hooks/useAuthenticate";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

const Notification = Object.freeze({
  lastMessageEmpty: "Say something with your friend !!",
  lastMessageOnlyAttachments: "Send attachments",
});

const useLastMessage = (conversation?: Conversation) => {
  const { isUser } = useAuthenticate();
  const [lastMessage, setLastMessage] = useState<string>(
    Notification.lastMessageEmpty
  );

  useEffect(() => {
    const lastMessage = conversation?.lastMessage?.content;
    if (!!lastMessage) {
      setLastMessage(lastMessage);
    } else {
      const attachments = conversation?.lastMessage?.attachments;
      if (!attachments?.isNotEmpty()) {
        toast.error("Something wrong on add message");
        return;
      }
      setLastMessage(`${Notification.lastMessageOnlyAttachments}`);
    }
  }, [
    conversation?.lastMessage?.content,
    conversation?.lastMessage?.attachments,
  ]);

  const lastMessenger = useMemo(() => {
    if (!conversation || !conversation.lastMessage) return "";
    return isUser(conversation.lastMessage.author)
      ? "You: "
      : `${conversation.lastMessage.author.lastName}: `;
  }, [conversation, isUser]);

  return { lastMessenger, lastMessage };
};

export default useLastMessage;
