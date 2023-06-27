import CallObserver from "@components/WebRTC/common/peer";
import { AnimatePresence } from "framer-motion";
import { FC, memo, useEffect, useState } from "react";
import CallingAction from "./components/container/CallingAction";
import PersonCall from "./components/container/PersonCall";
import { CallingViewAnimation } from "./styles/CallingView.animate";
import {
  CallingContainer,
  CallingViewContainer,
  CallingViewOverplay,
} from "./styles/CallingView.decorate";

const CallingView: FC<CallingViewProps> = ({ onStop, callerId, type }) => {
  const [callerStream, setCallerStream] = useState<MediaStream>();
  const [receiverStream, setReceiverStream] = useState<MediaStream>();

  useEffect(() => {
    const callChannel = CallObserver.get(callerId);
    if (!callChannel) return;
    setCallerStream(callChannel.localStream);
    // receiver
    callChannel.on("stream", (remoteStream) => {
      setReceiverStream(remoteStream);
    });
  }, [callerId]);

  return (
    <CallingViewOverplay {...CallingViewAnimation.overlay}>
      <AnimatePresence mode='wait'>
        <CallingViewContainer {...CallingViewAnimation.container}>
          <CallingContainer>
            <PersonCall
              stream={callerStream}
              microphone={true}
              webcam={type === "VideoCall"}
              metadata={{ name: "", avatar: "" }}
            />
            <PersonCall
              stream={receiverStream}
              microphone={true}
              webcam={type === "VideoCall"}
              metadata={{ name: "", avatar: "" }}
            />
          </CallingContainer>
          <CallingAction onStop={onStop} />
        </CallingViewContainer>
      </AnimatePresence>
    </CallingViewOverplay>
  );
};
export default memo(CallingView);
