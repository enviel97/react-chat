import useAppDispatch from "@hooks/useAppDispatch";
import useAppSelector from "@hooks/useAppSelector";
import {
  openCallView,
  selectCallById,
  selectCurrentCall,
} from "@store/slices/call";
import { useCallback } from "react";
import { toast } from "react-toastify";
import { devicesPermission } from "../utils/permission";

interface DeviceSetup {
  camera?: boolean;
}

const useAnswerController = (receiver: string) => {
  const dispatch = useAppDispatch();
  const currentCall = useAppSelector(selectCurrentCall);
  const peerConnection = useAppSelector((state) =>
    selectCallById(state, receiver)
  );

  const trigger = useCallback(
    async (callOptions: DeviceSetup) => {
      if (!peerConnection) return;

      if (currentCall) {
        toast.error("You should end the call before answering this call");
        return;
      }

      const mediaCall = await devicesPermission(callOptions);
      if (!mediaCall) return;

      peerConnection.connection.answer(mediaCall);
      dispatch(openCallView(receiver));
    },
    [peerConnection, receiver, currentCall]
  );

  return { trigger };
};

export default useAnswerController;
