import { memo } from "react";
import CallingNotifications from "./components/containers/CallingNotifications";
import { WebRTCContainer } from "./styles/WebRTC.decorate";
import CallingView from "./components/containers/CallingView";
import useAppSelector from "@hooks/useAppSelector";
import { callSelector } from "@store/slices/call";
import useCallSocket from "./hooks/useCallSocket";
import useCallError from "./hooks/useCallError";

const WebRTCProvider = () => {
  // listen
  const selectCall = useAppSelector(callSelector.selectCall);
  useCallSocket();
  useCallError();

  return (
    <WebRTCContainer>
      {selectCall && <CallingView callId={selectCall} />}
      <CallingNotifications />
    </WebRTCContainer>
  );
};

export default memo(WebRTCProvider);
