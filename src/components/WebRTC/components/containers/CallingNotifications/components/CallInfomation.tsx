import CircleAvatar from "@pages/Main/components/ui/CircleAvatar";
import { FC, memo } from "react";
import { CallNotificationInfo } from "../styles/CallNotification.decorate";

interface CallInfomationProps {
  avatar?: string;
  name: string;
}

const CallInfomation: FC<CallInfomationProps> = ({ avatar, name }) => {
  return (
    <CallNotificationInfo>
      <CircleAvatar src={avatar} viewPort='s' size={"3.5rem"} />
      <span>
        <b>{name}</b>
        <span>is calling</span>
      </span>
    </CallNotificationInfo>
  );
};

export default memo(CallInfomation);
