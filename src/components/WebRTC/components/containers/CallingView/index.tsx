import useAppSelector from "@hooks/useAppSelector";
import { callSelector, peerSelector } from "@store/slices/call";
import { FC, memo } from "react";
import CallingAction from "./components/container/CallingAction";
import LocalPersonCall from "./components/container/LocalPersonCall";
import RemotePersonCall from "./components/container/RemotePersonCall";
import useAutoEnded from "./hooks/useAutoEnded";
import usePeerCall from "./hooks/usePeerCall";
import { CallingViewAnimation } from "./styles/CallingView/CallingView.animate";
import {
  CallingContainer,
  CallingViewContainer,
  CallingViewOverplay,
} from "./styles/CallingView/CallingView.decorate";

interface CallingViewProps {
  callId: string;
}

const CallingView: FC<CallingViewProps> = ({ callId }) => {
  const currentCall = useAppSelector(callSelector.selectCurrentCall);
  const localStream = useAppSelector(peerSelector.selectMediaStream);
  const remoteStream = usePeerCall(localStream);
  const status: CallStatus = currentCall?.status ?? "connection";
  useAutoEnded({ callId: callId, status: status });

  return (
    <CallingViewOverplay {...CallingViewAnimation.overlay}>
      <CallingViewContainer {...CallingViewAnimation.container}>
        <CallingContainer>
          <LocalPersonCall stream={localStream} />
          <RemotePersonCall stream={remoteStream} />
        </CallingContainer>
        <CallingAction callId={callId} status={status} />
      </CallingViewContainer>
    </CallingViewOverplay>
  );
};
export default memo(CallingView);
