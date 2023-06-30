import useAppSelector from "@hooks/useAppSelector";
import { selectCallById } from "@store/slices/call";
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

const CallingView: FC<CallingViewProps> = ({ callerId }) => {
  const [callerStream, setCallerStream] = useState<MediaStream>();
  const [receiverStream, setReceiverStream] = useState<MediaStream>();
  const callChannel = useAppSelector((state) =>
    selectCallById(state, callerId)
  );

  useEffect(() => {
    if (!callChannel || !callChannel.connection) return;
    const connection = callChannel.connection;
    setCallerStream(connection.localStream);
    // receiver
    connection.on("stream", (remoteStream) => {
      setReceiverStream(remoteStream);
    });
  }, [callChannel]);

  return (
    <CallingViewOverplay {...CallingViewAnimation.overlay}>
      <AnimatePresence mode='wait'>
        <CallingViewContainer {...CallingViewAnimation.container}>
          <CallingContainer>
            <PersonCall
              stream={callerStream}
              metadata={{ name: "", avatar: "" }}
            />
            <PersonCall
              stream={receiverStream}
              metadata={{ name: "", avatar: "" }}
            />
          </CallingContainer>
          <CallingAction />
        </CallingViewContainer>
      </AnimatePresence>
    </CallingViewOverplay>
  );
};
export default memo(CallingView);
