import { Event } from "@common/socket.define";
import useAppDispatch from "@hooks/useAppDispatch";
import useAppSelector from "@hooks/useAppSelector";
import useSocket from "@hooks/useSocket";
import { addIncomingCall, callSelector, setCall } from "@store/slices/call";
import { useCallback, useState } from "react";

interface CallConfig {
  type?: CallType;
}
const useCallController = () => {
  const dispatch = useAppDispatch();
  const socket = useSocket();
  const call = useAppSelector(callSelector.selectAllCall);

  const [disabled, setDisabled] = useState<boolean>();

  /**
   * connection to receiver
   */
  const trigger = useCallback(
    (receiver: string, callOptions: CallConfig) => {
      const exits = call.find(({ receiverId }) => receiver === receiverId);
      if (exits) return setDisabled(true);

      socket.emit(
        Event.CALL_VIDEO.EMIT.CALLING,
        { receiver },
        (payload: CallPayload<IncomingCall>) => {
          if (!payload) return;
          const receiverInfo = payload.data;
          dispatch(setCall(receiverInfo.callId));
          dispatch(addIncomingCall({ ...receiverInfo, callType: "VideoCall" }));
        }
      );
    },
    [socket, dispatch, call]
  );

  return { trigger, disabled };
};

export default useCallController;
