import { Event } from "@common/socket.define";
import useSocket from "@hooks/useSocket";
import { useEffect } from "react";
import useListenBannedUser from "./Listener/useListenBannedUser";
import useListenConnectedRoom from "./Listener/useListenConnectedRoom";
import useListenLeavedRoom from "./Listener/useListenLeavedRoom";
import useListenLeavingUser from "./Listener/useListenLeavingUser";

// socket listener
const useConversationSocket = (id: string) => {
  const socket = useSocket();
  const handleOnBannerUser = useListenBannedUser(id);
  const handleOnLeavingUser = useListenLeavingUser(id);
  const handleConnectedRoom = useListenConnectedRoom();
  const handleLeavedRoom = useListenLeavedRoom();

  useEffect(() => {
    socket.on(Event.EVENT_BANNED_USER, handleOnBannerUser);
    socket.on(Event.EVENT_CONVERSATION_LEAVE_GROUP, handleOnLeavingUser);
    socket.on(Event.EVENT_CONNECTED_ROOM, handleConnectedRoom);
    socket.on(Event.EVENT_LEAVED_ROOM, handleLeavedRoom);
    return () => {
      socket.off(Event.EVENT_CONNECTED_ROOM);
      socket.off(Event.EVENT_LEAVED_ROOM);
      socket.off(Event.EVENT_BANNED_USER);
      socket.off(Event.EVENT_CONVERSATION_LEAVE_GROUP);
    };
  }, [
    handleOnBannerUser,
    handleConnectedRoom,
    handleLeavedRoom,
    handleOnLeavingUser,
    socket,
  ]);
};

export default useConversationSocket;
