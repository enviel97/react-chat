import { SocketContext } from "@context/SocketIOContext";
import { useContext } from "react";

const useSocket = () => {
  return useContext(SocketContext);
};
export default useSocket;
