import { baseUrlSocket } from "@common/config.define";
import { Event } from "@common/socket.define";
import useAuthenticate from "@hooks/useAuthenticate";
import { createContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";

const socket = io(baseUrlSocket, {
  withCredentials: true,
  reconnection: true,
});

export const SocketContext = createContext(socket);
let timeOut: NodeJS.Timeout;

export const SocketProvider = ({ children }: Components) => {
  const { user } = useAuthenticate();
  const counter = useRef(0);

  useEffect(() => {
    if (!user) return;
    if (!socket?.connected) socket.connect();

    socket.once(Event.EVENT_SOCKET_CONNECTED, (payload: any) => {
      console.log({ status: "connected", payload });
    });

    socket.once(Event.EVENT_SOCKET_ERROR, (err) => {
      console.log(`connect_error due to ${err.message}`);
    });

    // TODO: Connect socket reconnect if socket connect failure
    socket.on(Event.EVENT_SOCKET_DISCONNECT, (reason) => {
      if (!user) return;
      if (reason === "io server disconnect") {
        // the disconnection was initiated by the server, you need to reconnect manually
        socket.connect();
      }
      console.log({ status: "disconnected", reason });
      // else the socket will automatically try to reconnect
    });

    socket.on(Event.EVENT_SOCKET_RECONNECT, (attemptNumber) => {
      // ...
      counter.current = attemptNumber;
      if (counter.current >= 100) {
        socket.emit(Event.EVENT_SOCKET_DDOS, { user: user });
      }
      timeOut = setTimeout(() => {
        counter.current = 0;
      }, 1000);
    });
    return () => {
      socket.off(Event.EVENT_SOCKET_DISCONNECT);
      socket.off(Event.EVENT_SOCKET_RECONNECT);
      socket.off(Event.EVENT_SOCKET_CONNECTED);
      socket.off(Event.EVENT_SOCKET_ERROR);
      clearTimeout(timeOut);
      if (!socket.connected) return;
      socket.disconnect();
      socket.close();
    };
  }, [user]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
