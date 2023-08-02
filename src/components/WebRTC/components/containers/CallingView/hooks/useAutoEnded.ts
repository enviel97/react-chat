import useEndedCall from "@components/WebRTC/hooks/useEndedCall";
import useAppDispatch from "@hooks/useAppDispatch";
import { setCallError } from "@store/slices/call";
import { useEffect } from "react";

interface AutoEndedProps {
  callId: string;
  status: CallStatus;
}
const WAITING_CALL = 1000 * 60 * 3; // 3 minutes
let id: NodeJS.Timeout;
const useAutoEnded = (props: AutoEndedProps) => {
  const endedCall = useEndedCall(props.callId);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (props.status === "calling") {
      id = setTimeout(() => {
        endedCall().then(() => {
          dispatch(setCallError("peer-missing"));
        });
      }, WAITING_CALL);
    }

    return () => {
      id && clearTimeout(id);
    };
  }, [props.status, endedCall, dispatch]);
};

export default useAutoEnded;
