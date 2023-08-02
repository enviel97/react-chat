import { Event } from "@common/socket.define";
import useAppDispatch from "@hooks/useAppDispatch";
import useSocket from "@hooks/useSocket";
import { endedCall } from "@store/repo/call/actions/callController";
import { addIncomingCall } from "@store/slices/call";
import { useEffect } from "react";

const useCallSocket = () => {
  const socket = useSocket();
  const dispatch = useAppDispatch();

  useEffect(() => {
    socket.on(
      Event.CALL_VIDEO.LISTEN.CALLING,
      (payload: CallPayload<IncomingCall>) => {
        // Trigger connect to peer
        const incomingCall = payload.data;
        dispatch(
          addIncomingCall({
            ...incomingCall,
            callType: "VideoCall",
          })
        );
      }
    );
    socket.on(Event.CALL_VIDEO.LISTEN.REJECT, (payload: CallRejectPayload) => {
      const data = payload.data;
      dispatch(endedCall(data.callId));
    });
    return () => {
      socket.off(Event.CALL_VIDEO.LISTEN.CALLING);
      socket.off(Event.CALL_VIDEO.LISTEN.REJECT);
    };
  }, [socket, dispatch]);
};

export default useCallSocket;
