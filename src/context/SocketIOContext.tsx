import { Event } from "@core/common/socket.define";
import useAuthenticate from "@hooks/useAuthenticate";
import { createContext, useEffect } from "react";
import { io } from "socket.io-client";
const socketUrl = process.env.REACT_APP_WEBSOCKET_URL ?? "";

const socket = io(socketUrl, { withCredentials: true, autoConnect: false });

export const SocketContext = createContext(socket);

export const SocketProvider = ({ children }: Components) => {
  const { user } = useAuthenticate();

  useEffect(() => {
    if (!user) return;
    // TODO: Connect socket if login successful
    socket.connect();
  }, [user]);

  useEffect(() => {
    socket.on(Event.EVENT_SOCKET_CONNECTED, (payload: any) => {
      console.log({
        status: "connected",
        payload,
      });
    });
    return () => {
      socket.off(Event.EMIT_NOTIFICATION_MESSAGE, (payload: any) => {
        console.log({
          status: "disconnected",
          payload,
        });
      });
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
