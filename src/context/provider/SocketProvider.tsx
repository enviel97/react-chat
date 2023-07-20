import { baseUrlSocket } from "@common/config.define";
import { Event } from "@common/socket.define";
import useAuthenticate from "@hooks/useAuthenticate";
import { createContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";

const socket = io(baseUrlSocket, {
  withCredentials: true,
  reconnection: true,
  autoConnect: false,
  port: 80,
});

export const SocketContext = createContext(socket);
let timeOut: NodeJS.Timeout;

export const SocketProvider = ({ children }: Components) => {
  const { user, userId } = useAuthenticate();
  const counter = useRef(0);
  useEffect(() => {
    if (!socket) return;
    if (socket.disconnected || userId) socket.connect();
  }, [userId]);

  useEffect(() => {
    if (!user) return;

    socket.on(Event.EVENT_SOCKET_CONNECTED, () => {
      console.log(`Realtime server connection`);
    });

    socket.on(Event.EVENT_SOCKET_ERROR, (err) => {
      console.log(`connect_error due to ${err.message}`);
    });

    socket.on(Event.EVENT_SOCKET_DISCONNECT, (reason) => {
      if (reason === "io server disconnect") {
        console.log({ status: "io server disconnect", reason });
        socket.connect();
      }
      console.log({ status: "disconnected", reason });
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
