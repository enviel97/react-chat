import { Event } from "@common/socket.define";
import useAppDispatch from "@hooks/useAppDispatch";
import useAppSelector from "@hooks/useAppSelector";
import useSocket from "@hooks/useSocket";
import { beginCall } from "@store/repo/call/actions/callController";
import { addIncomingCall, callSelector, setCall } from "@store/slices/call";
import { useCallback, useEffect, useState } from "react";
import { genCallId } from "../utils/call";
// createID
const useCall = (receiver?: string) => {
  const dispatch = useAppDispatch();
  const socket = useSocket();
  const call = useAppSelector(callSelector.selectAllCall);
  const [disabled, setDisabled] = useState<boolean>();

  useEffect(() => {
    const exits = call.find(({ connecterId }) => receiver === connecterId);
    setDisabled(!!exits);
  }, [call, receiver]);

  /**
   * connection to receiver
   */
  const trigger = useCallback(async () => {
    if (disabled || !receiver) return;

    const callId = genCallId(receiver);
    dispatch(setCall(callId));
    dispatch(beginCall())
      .unwrap()
      .then(() => {
        socket.emit(
          Event.CALL_VIDEO.EMIT.CALLING,
          { callId, receiver },
          async (payload: CallPayload<IncomingCall>) => {
            if (!payload) return;
            const receiverInfo = payload.data;
            /**
             * Setup local stream and peer services
             */
            dispatch(
              addIncomingCall({
                ...receiverInfo,
                callType: "VideoCall",
              })
            );
          }
        );
      });

    // Trigger local stream
  }, [socket, dispatch, disabled, receiver]);

  return { trigger, disabled };
};

export default useCall;
