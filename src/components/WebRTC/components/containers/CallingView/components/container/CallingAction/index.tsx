import StopCallButton from "@components/WebRTC/components/containers/StopCallButton";
import { memo } from "react";
import {
  CallingActionContainer,
  StatusContainer,
} from "./styles/CallingAction.decorate";

const CallingAction = () => {
  return (
    <CallingActionContainer>
      <StatusContainer>Disconnect</StatusContainer>
      <StopCallButton />
    </CallingActionContainer>
  );
};

export default memo(CallingAction);
