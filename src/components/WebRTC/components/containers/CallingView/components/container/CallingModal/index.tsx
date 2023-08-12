import { FC, Fragment } from "react";
import CallingAction from "./components/containers/CallingAction";
import RemotePersonCall from "./components/containers/RemotePersonCall";
import useAutoEnded from "./hooks/useAutoEnded";
import { CallingContainer } from "./styles/CallingModal/decorate";

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
  // useAutoEnded({ callId: callId, status: status });
  return (
    <Fragment>
      <CallingContainer>
        <RemotePersonCall stream={remoteStream} />
        {/* <LocalPersonCall stream={localStream} /> */}
      </CallingContainer>
      <CallingAction callId={callId} status={status} />
    </Fragment>
  );
};

export default CallingModal;
