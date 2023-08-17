import useBreakpoint from "@hooks/useBreakpoint";
import CircleAvatar from "@pages/Main/components/ui/CircleAvatar";
import { FC, memo } from "react";
import {
  CallNotificationInfo,
  CallNotificationText,
} from "../styles/CallNotification.decorate";
import { Tooltip } from "react-tooltip";

interface CallInfomationProps {
  avatar?: string;
  name: string;
}

const CallInfomation: FC<CallInfomationProps> = ({ avatar, name }) => {
  const breakpoint = useBreakpoint();

  return (
    <CallNotificationInfo>
      <CircleAvatar src={avatar} viewPort='s' size={"3em"} />
      {!breakpoint.down("tablet") && (
        <CallNotificationText>
          <b>{name}</b>
          <span>is calling</span>
        </CallNotificationText>
      )}
      {breakpoint.down("tablet") && (
        <Tooltip content={name} anchorSelect={CallNotificationInfo} />
      )}
    </CallNotificationInfo>
  );
};

export default memo(CallInfomation);
