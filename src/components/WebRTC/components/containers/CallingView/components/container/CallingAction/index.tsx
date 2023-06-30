import IconButton from "@components/WebRTC/components/ui/IconButton";
import { memo } from "react";
import {
  CallingActionContainer,
  StatusContainer,
} from "./styles/CallingAction.decorate";

const CallingAction = () => {
  return (
    <CallingActionContainer>
      <StatusContainer>Disconnect</StatusContainer>
      <IconButton type={"Stop"} onClick={() => {}} />
    </CallingActionContainer>
  );
};

export default memo(CallingAction);
