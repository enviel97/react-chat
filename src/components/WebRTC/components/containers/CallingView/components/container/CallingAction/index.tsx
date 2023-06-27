import IconButton from "@components/WebRTC/components/ui/IconButton";
import { FC } from "react";
import {
  CallingActionContainer,
  StatusContainer,
} from "./styles/CallingAction.decorate";

interface CallingActionProps {
  onStop: () => void;
}

const CallingAction: FC<CallingActionProps> = ({ onStop }) => {
  return (
    <CallingActionContainer>
      <StatusContainer>Disconnect</StatusContainer>
      <IconButton type={"Stop"} onClick={onStop} />
    </CallingActionContainer>
  );
};

export default CallingAction;
