import { SocketContext } from "@context/provider/SocketProvider";
import { useContext } from "react";

const useSocket = () => {
  return useContext(SocketContext);
};
export default useSocket;
