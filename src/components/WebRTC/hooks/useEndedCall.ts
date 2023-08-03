import { Event } from "@common/socket.define";
import useAppDispatch from "@hooks/useAppDispatch";
import useSocket from "@hooks/useSocket";
import { endedCall } from "@store/repo/call/actions/callController";
import { useCallback } from "react";

const useEndedCall = (connectionId?: string) => {
  const dispatch = useAppDispatch();
  const socket = useSocket();

  const handleReject = useCallback(async () => {
    if (!connectionId) return;
    dispatch(endedCall(connectionId))
      .unwrap()
      .then((incomingCall) => {
        if (!incomingCall.connecterId) return;
        socket.emit(Event.CALL_VIDEO.EMIT.REJECT, incomingCall);
      });
  }, [connectionId, dispatch, socket]);

  return handleReject;
};

export default useEndedCall;
