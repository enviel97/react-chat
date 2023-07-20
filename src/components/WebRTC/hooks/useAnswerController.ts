import { Event } from "@common/socket.define";
import useAppDispatch from "@hooks/useAppDispatch";
import useSocket from "@hooks/useSocket";
import { connect } from "@store/repo/call";
import { addIncomingCall, setCall } from "@store/slices/call";
import { useCallback } from "react";

interface DeviceSetup {
  camera?: boolean;
}

const useAnswerController = () => {
  const dispatch = useAppDispatch();
  const socket = useSocket();

  const trigger = useCallback(
    async (caller: string, callOptions: DeviceSetup) => {
      dispatch(connect())
        .unwrap()
        .then(() => {
          socket.emit(
            Event.CALL_VIDEO.EMIT.ACCEPT,
            { caller },
            (payload: CallPayload<IncomingCall>) => {
              if (!payload) return;
              const incomingCall = payload.data;
              dispatch(setCall(incomingCall.callId));
              dispatch(
                addIncomingCall({
                  ...incomingCall,
                  callType: "VideoCall",
                })
              );
            }
          );
        });
    },
    [socket, dispatch]
  );

  return { trigger };
};

export default useAnswerController;
