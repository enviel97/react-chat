import { FC } from "react";
import RemotePersonCall from "./components/containers/RemotePersonCall";
import useAutoEnded from "./hooks/useAutoEnded";
import {
  CallingContainer,
  CallingDisplayName,
  CallingInfoContainer,
} from "./styles/CallingModal/decorate";
import Animate from "./styles/CallingModal/animate";
import useAppSelector from "@hooks/useAppSelector";
import { selectRemoteInfo } from "@store/slices/call/selectors/call.selector";
import LocalPersonCall from "./components/containers/LocalPersonCall";
import Timer from "./components/ui/Timer";

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
  useAutoEnded({ callId: callId, status: status });
  return (
    <CallingContainer {...Animate.Container}>
      <RemotePersonCall
        stream={remoteStream}
        avatar={remoteInfo?.avatar}
        camera={true}
        microphone={false}
        status={status}
        callId={callId}
      />
      <LocalPersonCall
        stream={localStream}
        microphone={false}
        camera={true}
        expanded={false}
      />
      <CallingInfoContainer>
        <CallingDisplayName>
          <span>Calling to:</span>
          <b>{remoteInfo?.name ?? "@Receiver"}</b>
        </CallingDisplayName>
        <Timer status={status} />
      </CallingInfoContainer>
    </CallingContainer>
  );
};

export default CallingModal;
