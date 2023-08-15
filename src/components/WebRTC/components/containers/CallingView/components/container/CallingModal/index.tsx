import { FC } from "react";
import CallingAction from "./components/ui/CallingAction";
import RemotePersonCall from "./components/containers/RemotePersonCall";
import useAutoEnded from "./hooks/useAutoEnded";
import {
  CallingContainer,
  CallingInfoContainer,
} from "./styles/CallingModal/decorate";
import Animate from "./styles/CallingModal/animate";
import useAppSelector from "@hooks/useAppSelector";
import { selectRemoteInfo } from "@store/slices/call/selectors/call.selector";
import useTimer from "./hooks/useTimer";
import LocalPersonCall from "./components/containers/LocalPersonCall";

interface CallingModalProps {
  remoteStream?: MediaStream;
  localStream?: MediaStream;
  callId: string;
  status: CallStatus;
}

const CallingModal: FC<CallingModalProps> = ({
  callId,
  status,
  remoteStream,
  localStream,
}) => {
  const remoteInfo = useAppSelector(selectRemoteInfo);
  // const timer = useTimer(status === "answer");
  const timer = useTimer(status === "answer");
  // useAutoEnded({ callId: callId, status: status });
  return (
    <CallingContainer {...Animate.Container}>
      <RemotePersonCall stream={remoteStream} avatar={remoteInfo?.avatar} />
      <LocalPersonCall stream={localStream} />
      <CallingInfoContainer>
        <CallingAction callId={callId} status={status} />
        <h6>{remoteInfo?.name ?? "@Calling"}</h6>
        {timer && <span>{timer}</span>}
      </CallingInfoContainer>
    </CallingContainer>
  );
};

export default CallingModal;
