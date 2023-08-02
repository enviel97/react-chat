import { Event } from "@common/socket.define";
import useAppDispatch from "@hooks/useAppDispatch";
import useSocket from "@hooks/useSocket";
import { beginCall } from "@store/repo/call/actions/callController";
import { setCall } from "@store/slices/call";
import { useCallback } from "react";

interface UseHandleCallProps {
  connectionId?: string;
  caller?: string;
}
const useAnswerCall = (props: UseHandleCallProps) => {
  const dispatch = useAppDispatch();
  const socket = useSocket();

  const handleAnswerCall = useCallback(async () => {
    const { connectionId, caller } = props;
    if (!connectionId || !caller) return;
    dispatch(beginCall())
      .unwrap()
      .then(() => {
        socket.emit(
          Event.CALL_VIDEO.EMIT.ACCEPT,
          { callId: connectionId, caller },
          (payload: CallPayload<IncomingCall>) => {
            if (!payload) return;
            dispatch(setCall(connectionId));
          }
        );
      });
    // eslint-disable-next-line
  }, [socket, dispatch, props.connectionId, props.caller]);

  return handleAnswerCall;
};

export default useAnswerCall;
