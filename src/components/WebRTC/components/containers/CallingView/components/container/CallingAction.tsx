import IconButton from "@components/WebRTC/components/ui/IconButton";
import useEndedCall from "@components/WebRTC/hooks/useEndedCall";
import { AnimatePresence } from "framer-motion";
import { FC, memo } from "react";
import { CallingActionAnimation } from "../../styles/CallingAction/CallingAction.animate";
import {
  CallingActionContainer,
  CallingActionLight,
  CallingActionNotification,
  StatusContainer,
} from "../../styles/CallingAction/CallingAction.decorate";
import PersonCallTime from "../ui/PersonCallTime";

interface CallingActionProps {
  callId: string;
  status: CallStatus;
}
const statusList: CallStatus[] = [
  "connection",
  "calling",
  "answer",
  "ended",
  "error",
];

const CallingAction: FC<CallingActionProps> = ({ callId, status }) => {
  const handleEndedCall = useEndedCall(callId);

  // TODO: time counter

  return (
    <CallingActionContainer>
      <StatusContainer>
        <CallingActionLight $status={status} />
        <AnimatePresence mode='wait'>
          {statusList.map(
            (value) =>
              status === value && (
                <CallingActionNotification
                  {...CallingActionAnimation.text}
                  key={value}
                >
                  {status === "answer" ? <PersonCallTime /> : value}
                </CallingActionNotification>
              )
          )}
        </AnimatePresence>
      </StatusContainer>

      <IconButton type='PhoneOff' onClick={handleEndedCall} />
    </CallingActionContainer>
  );
};

export default memo(CallingAction);
