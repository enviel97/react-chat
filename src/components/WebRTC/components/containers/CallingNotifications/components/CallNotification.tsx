import { FC, Fragment } from "react";
import {
  CallNotificationAction,
  CallNotificationContentContainer,
} from "../styles/CallNotification.decorate";
import useAppSelector from "@hooks/useAppSelector";
import { callSelector } from "@store/slices/call";
import IconButton from "@components/WebRTC/components/ui/IconButton";
import useEndedCall from "@components/WebRTC/hooks/useEndedCall";
import useAnswerCall from "@components/WebRTC/hooks/useAnswerCall";
import CallInfomation from "./CallInfomation";

const CallNotification: FC<CallNotificationProps> = ({ connectionId }) => {
  const connection = useAppSelector((state) =>
    callSelector.selectCallById(state, connectionId)
  );

  const handleEndedCall = useEndedCall(connectionId);
  const handleAnswerCall = useAnswerCall({
    connectionId,
    caller: connection?.connecterId,
  });

  if (!connection) return <></>;

  // hook data in here
  return (
    <CallNotificationContentContainer>
      <CallInfomation name={connection.name} avatar={connection.avatar} />
      <CallNotificationAction>
        <IconButton type='Phone' onClick={handleAnswerCall} animation='ring' />
        <IconButton type='PhoneOff' onClick={handleEndedCall} />
      </CallNotificationAction>
    </CallNotificationContentContainer>
  );
};

export default CallNotification;
