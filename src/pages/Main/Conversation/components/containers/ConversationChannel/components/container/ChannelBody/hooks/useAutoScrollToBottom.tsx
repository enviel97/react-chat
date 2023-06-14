import useAppSelector from "@hooks/useAppSelector";
import { selectAllMessage } from "@store/slices/messages";
import { useLayoutEffect, useRef } from "react";

const useAutoScrollToBottom = () => {
  const messages = useAppSelector(selectAllMessage);
  const targetRef = useRef<HTMLDivElement | null>(null);
  useLayoutEffect(() => {
    // Scroll to new messenger
    const container = targetRef.current;
    container?.scrollTo({
      top: container?.scrollHeight ?? window.innerHeight,
      left: 0,
      behavior: "auto",
    });
  }, [messages, targetRef]);

  return targetRef;
};

export default useAutoScrollToBottom;
