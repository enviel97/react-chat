import useAppSelector from "@hooks/useAppSelector";
import { callSelector, peerSelector } from "@store/slices/call";
import { AnimatePresence } from "framer-motion";
import { FC, memo } from "react";
import usePeerCall from "./hooks/usePeerCall";

import CallingModal from "./components/container/CallingModal";
import {
  CallingViewContainer,
  CallingViewOverplay,
} from "./styles/CallingView/decorate";
import { CallingViewAnimation } from "./styles/CallingView/animate";
import CallingNotification from "./components/container/CallingNotification";

interface CallingViewProps {
  callId: string;
}

const CallingView: FC<CallingViewProps> = ({ callId }) => {
  const currentCall = useAppSelector(callSelector.selectCurrentCall);
  const localStream = useAppSelector(peerSelector.selectMediaStream);
  const remoteStream = usePeerCall(localStream);

  return (
    <CallingViewOverplay {...CallingViewAnimation.overlay}>
      <CallingViewContainer {...CallingViewAnimation.container}>
        <AnimatePresence>
          {!currentCall && <CallingNotification />}
          {currentCall && (
            <CallingModal
              remoteStream={remoteStream}
              localStream={localStream}
              callId={currentCall?.connectionId ?? ""}
              status={currentCall?.status ?? "connection"}
            />
          )}
        </AnimatePresence>
      </CallingViewContainer>
    </CallingViewOverplay>
  );
};
export default memo(CallingView);
