import { memo } from "react";
import CallingNotifications from "./components/containers/CallingNotifications";
import { WebRTCContainer } from "./styles/WebRTC.decorate";
import CallingView from "./components/containers/CallingView";
import { AnimatePresence } from "framer-motion";
import useAppSelector from "@hooks/useAppSelector";
import { selectCurrentCall } from "@store/slices/call";

const WebRTCProvider = () => {
  const selectAnswer = useAppSelector(selectCurrentCall);

  return (
    <WebRTCContainer>
      <AnimatePresence mode='wait'>
        {selectAnswer && <CallingView callerId={selectAnswer} />}
      </AnimatePresence>
      <CallingNotifications />
    </WebRTCContainer>
  );
};

export default memo(WebRTCProvider);
