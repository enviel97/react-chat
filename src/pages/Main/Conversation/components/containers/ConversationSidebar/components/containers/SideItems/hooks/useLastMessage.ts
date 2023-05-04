import useAuthenticate from "@hooks/useAuthenticate";
import { useEffect, useMemo, useState } from "react";

const useLastMessage = (conversation?: Conversation) => {
  const { isUser } = useAuthenticate();

  useEffect(() => {
    if (!!conversation?.lastMessage?.content) {
      setLastMessage(conversation.lastMessage.content);
    }
  }, [conversation?.lastMessage?.content]);

  const [lastMessage, setLastMessage] = useState(
    "Say something with your friend !!"
  );

  const lastMessenger = useMemo(() => {
    if (!conversation) return "";
    return !conversation.lastMessage
      ? ""
      : isUser(conversation.lastMessage.author)
      ? "You: "
      : `${conversation.lastMessage.author.lastName}: `;
  }, [conversation, isUser]);

  return { lastMessenger, lastMessage };
};

export default useLastMessage;
