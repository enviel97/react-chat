import useAnswerController from "@components/WebRTC/hooks/useAnswerController";
import { FC, memo, useCallback } from "react";
import IconButton from "../ui/IconButton";

interface AnswerCallButtonProps {
  callerId: string;
}

const AnswerCallButton: FC<AnswerCallButtonProps> = ({ callerId }) => {
  const { trigger } = useAnswerController();
  const handleAnswerCall = useCallback(() => {
    trigger(callerId, {});
  }, [callerId]);

  return (
    <IconButton type='Phone' onClick={handleAnswerCall} animation='ring' />
  );
};

export default memo(AnswerCallButton);
