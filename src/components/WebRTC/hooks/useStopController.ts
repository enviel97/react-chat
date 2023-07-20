import useAppDispatch from "@hooks/useAppDispatch";
import { removeIncomingCall, setCall } from "@store/slices/call";
import { useCallback } from "react";

const useStopController = () => {
  const dispatch = useAppDispatch();

  const trigger = useCallback(async (callId: string) => {
    dispatch(setCall(null));
    dispatch(removeIncomingCall(callId));
  }, []);

  return { trigger };
};

export default useStopController;
