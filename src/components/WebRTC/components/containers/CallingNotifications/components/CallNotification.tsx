import { FC, Fragment, useEffect, useState } from "react";
import {
  CallNotificationAction,
  CallNotificationInfo,
} from "../styles/CallNotification.decorate";
import CallAvatar from "@components/WebRTC/components/ui/CallAvatar";
import AnswerCallButton from "../../AnswerCallButton";
import StopCallButton from "../../StopCallButton";
import useAppSelector from "@hooks/useAppSelector";
import { selectPeer } from "@store/slices/call";

const CallNotification: FC<CallNotificationProps> = ({ connectionId }) => {
  const [name] = useState<string>("[Name]");
  const [type] = useState<CallType>("PhoneCall");
  const peer = useAppSelector(selectPeer);

  useEffect(() => {
    if (!peer || !peer.id) return;
    peer.on("connection", (dataConnection) => {
      console.log({ dataConnection });
      dataConnection.on("data", (data: any) => {
        console.log({ data });
      });
    });
  }, [peer]);

  // hook data in here
  return (
    <Fragment>
      <CallNotificationInfo>
        <CallAvatar type={type} />
        <span>{name} is called</span>
      </CallNotificationInfo>
      <CallNotificationAction>
        <AnswerCallButton callId={connectionId} />
        <StopCallButton />
      </CallNotificationAction>
    </Fragment>
  );
};

export default CallNotification;
