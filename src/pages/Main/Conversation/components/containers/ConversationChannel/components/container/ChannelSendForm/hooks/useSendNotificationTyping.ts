import { Event } from "@common/socket.define";
import useSocket from "@hooks/useSocket";
import { useCallback } from "react";

let timeoutId: NodeJS.Timeout | undefined;

const useSendNotificationTyping = (conversationId: string) => {
  const socket = useSocket();
  const _sendTypingNotification = useCallback(() => {
    if (timeoutId) clearTimeout(timeoutId);
    if (!timeoutId) {
      socket.emit(Event.EVENT_USER_TYPING_START, {
        conversationId: conversationId,
      });
    }
    timeoutId = setTimeout(() => {
      timeoutId = undefined;
      socket.emit(Event.EVENT_USER_TYPING_STOP, {
        conversationId: conversationId,
      });
    }, 500);
  }, [conversationId, socket]);

  return _sendTypingNotification;
};

export default useSendNotificationTyping;
