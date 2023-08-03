import { Event } from "@common/socket.define";
import useAppDispatch from "@hooks/useAppDispatch";
import useAppSelector from "@hooks/useAppSelector";
import useSocket from "@hooks/useSocket";
import { endedCall } from "@store/repo/call/actions/callController";
import { callSelector, setCallError } from "@store/slices/call";
import { useCallback, useEffect } from "react";
import { toast } from "react-toastify";

const useCallError = () => {
  const selectCallError = useAppSelector(callSelector.selectCallError);
  const dispatch = useAppDispatch();
  const socket = useSocket();

  const handleListenCallError = useCallback(
    (payload: CallErrorPayload) => {
      dispatch(setCallError(payload.type));
      switch (payload.type) {
        case "user-unavailable": {
          dispatch(endedCall(payload.data));
        }
      }
    },
    [dispatch]
  );

  useEffect(() => {
    socket.on(Event.CALL_VIDEO.LISTEN.ERROR, handleListenCallError);
    return () => {
      socket.off(Event.CALL_VIDEO.LISTEN.ERROR);
    };
  }, [socket, handleListenCallError]);

  useEffect(() => {
    if (!selectCallError) return;
    const id = selectCallError.type;
    if (toast.isActive(id)) return;
    toast.info(selectCallError.message, {
      toastId: id,
      onOpen: () => {
        dispatch(setCallError());
      },
    });
  }, [selectCallError, dispatch]);
};

export default useCallError;
