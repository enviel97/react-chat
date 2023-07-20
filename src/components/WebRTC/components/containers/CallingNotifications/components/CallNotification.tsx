import { FC, Fragment, useEffect, useState } from "react";
import {
  CallNotificationAction,
  CallNotificationInfo,
} from "../styles/CallNotification.decorate";
import CallAvatar from "@components/WebRTC/components/ui/CallAvatar";
import AnswerCallButton from "../../AnswerCallButton";
import StopCallButton from "../../StopCallButton";
import useAppSelector from "@hooks/useAppSelector";
import { callSelector } from "@store/slices/call";

const CallNotification: FC<CallNotificationProps> = ({ connectionId }) => {
  const connection = useAppSelector((state) =>
    callSelector.selectCallById(state, connectionId)
  );
  if (!connection) return <></>;

  // hook data in here
  return (
    <Fragment>
      <CallNotificationInfo>
        <CallAvatar type={connection.type} src={connection.avatar} />
        <span>{connection.name} is called</span>
      </CallNotificationInfo>
      <CallNotificationAction>
        <AnswerCallButton callerId={connection.receiverId} />
        <StopCallButton connectionId={connection.connectionId} />
      </CallNotificationAction>
    </Fragment>
  );
};

export default CallNotification;
