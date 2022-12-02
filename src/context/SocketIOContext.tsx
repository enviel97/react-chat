import { createContext, useEffect } from "react";
import { io } from "socket.io-client";
import { Event } from "@core/common/socket.define";
const socketUrl = process.env.REACT_APP_WEBSOCKET_URL ?? "";

const socket = io(socketUrl);

export const SocketContext = createContext(socket);

export const SocketProvider = ({ children }: Components) => {
  useEffect(() => {
    socket.on(Event.EVENT_SOCKET_CONNECTED, (status: any) => {
      console.log("Connected");
    });

    return () => {
      socket.off(Event.EVENT_SOCKET_CONNECTED, () => {
        console.log("Unconnected");
      });
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
