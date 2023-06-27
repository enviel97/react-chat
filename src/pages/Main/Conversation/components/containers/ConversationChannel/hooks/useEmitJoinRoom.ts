import { Event } from "@common/socket.define";
import useSocket from "@hooks/useSocket";
import { useEffect } from "react";

const useEmitJoinRoom = (id: string) => {
  const socket = useSocket();
  useEffect(() => {
    /**
     * Connect to conversation before render UI
     */
    socket.emit(Event.EVENT_CONNECT_ROOM_CONVERSATION, {
      conversationId: id,
    });
    return () => {
      socket.emit(Event.EVENT_LEAVE_ROOM_CONVERSATION, { conversationId: id });
    };
  }, [id, socket]);
};

export default useEmitJoinRoom;
