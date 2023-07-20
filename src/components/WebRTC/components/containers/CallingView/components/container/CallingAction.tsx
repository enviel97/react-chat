import StopCallButton from "@components/WebRTC/components/containers/StopCallButton";
import useAppSelector from "@hooks/useAppSelector";
import { callSelector } from "@store/slices/call";
import { memo } from "react";
import {
  CallingActionContainer,
  StatusContainer,
} from "../../styles/CallingAction.decorate";

const CallingAction = () => {
  const currentCall = useAppSelector(callSelector.selectCall);

  return (
    <CallingActionContainer>
      <StatusContainer>Disconnect</StatusContainer>
      <StopCallButton connectionId={currentCall} />
    </CallingActionContainer>
  );
};

export default memo(CallingAction);
