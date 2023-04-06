import { Event } from "@common/socket.define";
import useSocket from "@hooks/useSocket";
import { useEffect, useState, useTransition } from "react";

interface Props {
  userId: string;
  defaultStatus?: boolean;
}

const useListenUserActiveChange = ({
  userId,
  defaultStatus = false,
}: Props) => {
  const socket = useSocket();

  const [isOnline, setOnline] = useState<boolean>(defaultStatus);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    socket.on(
      Event.EVENT_NOTIFICATION_CHANGE_STATUS,
      (payload: StatusUserPayload) => {
        if (userId === payload.id) {
          startTransition(() => setOnline(payload.action === "online"));
        }
      }
    );
    return () => {
      socket.off(Event.EVENT_NOTIFICATION_CHANGE_STATUS);
    };
  }, [socket, userId]);

  return { isOnline: isOnline || isPending };
};

export default useListenUserActiveChange;
