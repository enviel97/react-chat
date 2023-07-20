import useStopController from "@components/WebRTC/hooks/useStopController";
import { FC, memo, useCallback } from "react";
import IconButton from "../ui/IconButton";

interface StopCallButtonProps {
  connectionId?: string;
}

const StopCallButton: FC<StopCallButtonProps> = ({ connectionId }) => {
  const { trigger } = useStopController();

  const handleReject = useCallback(async () => {
    if (!connectionId) return;
    trigger(connectionId);
  }, [trigger, connectionId]);

  return (
    <IconButton
      type='PhoneOff'
      onClick={handleReject}
      disabled={!connectionId}
    />
  );
};

export default memo(StopCallButton);
