import { DevicesValue } from "@common/helper/breakpoint";
import { Event } from "@core/common/socket.define";
import useAuthenticate from "@hooks/useAuthenticate";
import MobileDetect from "mobile-detect";
import { createContext, useEffect } from "react";
import { io } from "socket.io-client";

const device = new MobileDetect(window.navigator.userAgent);
const socketUrl =
  (device.isPhoneSized(DevicesValue.tablet)
    ? process.env.REACT_APP_WEBSOCKET_URL_MOBILE
    : process.env.REACT_APP_WEBSOCKET_URL_COMPUTER) ?? "";

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
      socket.off(Event.EVENT_MESSAGE_CREATED, (payload: any) => {
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
