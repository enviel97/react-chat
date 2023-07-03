import { Event } from "@common/socket.define";
import useSocket from "@hooks/useSocket";
import { useEffect } from "react";
import useListenBannedUser from "./Listener/useListenBannedUser";
import useListenLeavingUser from "./Listener/useListenLeavingUser";

// socket listener
const useConversationSocket = (id: string) => {
  const socket = useSocket();
  const handleOnBannerUser = useListenBannedUser(id);
  const handleOnLeavingUser = useListenLeavingUser(id);

  useEffect(() => {
    socket.on(Event.EVENT_BANNED_USER, handleOnBannerUser);
    socket.on(Event.EVENT_CONVERSATION_LEAVE_GROUP, handleOnLeavingUser);
    return () => {
      socket.off(Event.EVENT_BANNED_USER);
      socket.off(Event.EVENT_CONVERSATION_LEAVE_GROUP);
    };
  }, [handleOnBannerUser, handleOnLeavingUser, socket]);
};

export default useConversationSocket;
