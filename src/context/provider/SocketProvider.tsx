import { baseUrlSocket } from "@common/config.define";
import { Event } from "@common/socket.define";
import useAuthenticate from "@hooks/useAuthenticate";
import { createContext, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io(baseUrlSocket, {
  withCredentials: true,
});

export const SocketContext = createContext(socket);

export const SocketProvider = ({ children }: Components) => {
  const { user } = useAuthenticate();

  useEffect(() => {
    if (!user) return;
    // TODO: Connect socket reconnect if socket connect failure
    if (!socket.connected) socket.connect();
  }, [user]);

  useEffect(() => {
    socket.on(Event.EVENT_SOCKET_CONNECTED, (payload: any) => {
      console.log({
        status: "connected",
        payload,
      });
    });
    socket.on(Event.EVENT_SOCKET_ERROR, (err) => {
      console.log(`connect_error due to ${err.message}`);
    });
    return () => {
      socket.off(Event.EVENT_SOCKET_CONNECTED);
      socket.off(Event.EVENT_SOCKET_ERROR);
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
