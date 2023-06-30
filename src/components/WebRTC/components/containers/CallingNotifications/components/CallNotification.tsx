import { FC, Fragment, useCallback, useEffect, useState } from "react";
import {
  CallNotificationAction,
  CallNotificationInfo,
} from "../styles/CallNotification.decorate";
import CallAvatar from "@components/WebRTC/components/ui/CallAvatar";
import IconButton from "@components/WebRTC/components/ui/IconButton";
import useAppSelector from "@hooks/useAppSelector";
import { selectPeer } from "@store/slices/call";

const CallNotification: FC<CallNotificationProps> = ({ connectionId }) => {
  const peer = useAppSelector(selectPeer);
  const [name] = useState<string>("[Name]");
  const [type] = useState<CallType>("PhoneCall");

  useEffect(() => {
    if (!peer || !peer.id) return;

    // Listener
  }, [peer]);

  const handleAnswer = useCallback(async () => {}, []);

  const handleReject = useCallback(async () => {}, []);

  // hook data in here
  return (
    <Fragment>
      <CallNotificationInfo>
        <CallAvatar type={type} />
        <span>{name} is called</span>
      </CallNotificationInfo>
      <CallNotificationAction>
        <IconButton type='Answer' onClick={handleAnswer} animation='ring' />
        <IconButton type='Stop' onClick={handleReject} />
      </CallNotificationAction>
    </Fragment>
  );
};

export default CallNotification;
