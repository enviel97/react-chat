import useAnswerController from "@components/WebRTC/hooks/useAnswerController";
import { FC, memo, useCallback } from "react";
import IconButton from "../ui/IconButton";

interface AnswerCallButtonProps {
  callId: string;
}

const AnswerCallButton: FC<AnswerCallButtonProps> = ({ callId }) => {
  const { trigger } = useAnswerController(callId);
  const handleAnswerCall = useCallback(() => {
    trigger({});
  }, []);

  return (
    <IconButton type='Phone' onClick={handleAnswerCall} animation='ring' />
  );
};

export default memo(AnswerCallButton);
