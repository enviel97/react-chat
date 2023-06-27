import useWebRTC from "@components/WebRTC/hooks/useWebRTC";
import { FC, Fragment, useCallback, useEffect, useState } from "react";
import {
  CallNotificationAction,
  CallNotificationInfo,
} from "../styles/CallNotification.decorate";
import CallAvatar from "@components/WebRTC/components/ui/CallAvatar";
import IconButton from "@components/WebRTC/components/ui/IconButton";
import { devicesPermission } from "@components/WebRTC/utils/permission";
import { safeLog } from "@core/api/utils/logger";

const CallNotification: FC<CallNotificationProps> = ({
  onAnswerCall,
  onRejectCall,
  connectionId,
}) => {
  const { peer } = useWebRTC();
  const [name] = useState<string>("[Name]");
  const [type] = useState<CallType>("PhoneCall");

  useEffect(() => {
    if (!peer || !peer.id) return;

    // Listener
  }, [peer]);

  const handleAnswer = useCallback(async () => {
    const userMedia = await devicesPermission(type);
    if (!peer || !userMedia) {
      return safeLog("No peer or devices");
    }
    // handle Answer call
    onAnswerCall && onAnswerCall(connectionId, type);
  }, [peer, type, onAnswerCall, connectionId]);

  const handleReject = useCallback(async () => {
    onRejectCall && onRejectCall(connectionId);
  }, [onRejectCall, connectionId]);

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
