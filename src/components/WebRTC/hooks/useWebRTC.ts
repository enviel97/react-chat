import { useContext } from "react";
import { WebRTCContext } from "..";

const useWebRTC = () => {
  const webRTC = useContext(WebRTCContext);
  return webRTC;
};

export default useWebRTC;
