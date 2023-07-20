import { Event } from "@common/socket.define";
import useAppDispatch from "@hooks/useAppDispatch";
import useSocket from "@hooks/useSocket";
import { addIncomingCall } from "@store/slices/call";
import { useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import {
  CALL_UNAVAILABLE,
  PEER_SERVER_UNDEFINED,
} from "../commons/error.quotes";
import useStopController from "./useStopController";

const useCallSocket = () => {
  const socket = useSocket();
  const dispatch = useAppDispatch();
  const { trigger } = useStopController();

  const handleListenIncomingCall = useCallback(
    (payload: CallPayload<IncomingCall>) => {
      // Trigger connect to peer
      const incomingCall = payload.data;
      dispatch(
        addIncomingCall({
          ...incomingCall,
          callType: "VideoCall",
        })
      );
    },
    [dispatch]
  );

  const handleListenCallError = useCallback(
    (payload: CallErrorPayload) => {
      switch (payload.type) {
        case "user-unavailable": {
          toast.error(CALL_UNAVAILABLE);
          return;
        }
        case "p2p-unavailable": {
          toast.error(PEER_SERVER_UNDEFINED);
          trigger(payload.data.callId);
          // TODO
          return;
        }
      }
    },
    [trigger]
  );

  useEffect(() => {
    socket.on(Event.CALL_VIDEO.LISTEN.CALLING, handleListenIncomingCall);
    socket.on(Event.CALL_VIDEO.LISTEN.ERROR, handleListenCallError);
    return () => {
      socket.off(Event.CALL_VIDEO.LISTEN.CALLING);
      socket.off(Event.CALL_VIDEO.LISTEN.ERROR);
    };
  }, [socket, handleListenIncomingCall, handleListenCallError]);
};

export default useCallSocket;
