import { memo } from "react";
import CallingNotifications from "./components/containers/CallingNotifications";
import { WebRTCContainer } from "./styles/WebRTC.decorate";
import CallingView from "./components/containers/CallingView";
import { AnimatePresence } from "framer-motion";
import useAppSelector from "@hooks/useAppSelector";
import { callSelector } from "@store/slices/call";
import useCallSocket from "./hooks/useCallSocket";
import useWebRtcController from "./hooks/useWebRtcController";

const WebRTCProvider = () => {
  // listen
  useCallSocket();
  // useWebRtcController();
  const selectCall = useAppSelector(callSelector.selectCall);

  return (
    <WebRTCContainer>
      <AnimatePresence mode='wait'>
        {selectCall && <CallingView />}
      </AnimatePresence>
      <CallingNotifications />
    </WebRTCContainer>
  );
};

export default memo(WebRTCProvider);
