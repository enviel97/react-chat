import { safeLog } from "@core/api/utils/logger";
import useAppSelector from "@hooks/useAppSelector";
import { selectUser } from "@store/slices/profiles";
import type Peer from "peerjs";
import { useCallback, useMemo, useState } from "react";
import { toast } from "react-toastify";
import CallObserver from "../common/peer";
import { devicesPermission } from "../utils/permission";

const useCallController = (peer?: Peer) => {
  const [selectAnswer, setSelectAnswer] = useState<CallModel>();
  const user = useAppSelector(selectUser);

  const metadata = useMemo(() => {
    return {
      name: user.profile?.displayName ?? user.getFullName(),
      avatar: user.profile?.avatar,
    };
  }, [user]);

  const call = useCallback(
    async function (receiver: CallModel) {
      if (!peer || !peer.id) {
        safeLog({ peer });
        toast.error("Phone server connected failure");
        return;
      }
      const userMedia = await devicesPermission(receiver.type);
      if (!userMedia) return safeLog("No peer or devices");
      setSelectAnswer(receiver);

      const connect = peer.connect(receiver.id);
      connect.on("error", (error) => {
        console.log({ connect: error });
        toast.info("Calling failure");
      });
      const caller = peer.call(receiver.id, userMedia, { metadata });
      caller.on("error", (error) => {
        console.log({ call: error });
        toast.info("Receiver error");
      });
      CallObserver.set(receiver.id, caller);
    },
    [peer, metadata]
  );

  const answer = useCallback(async function (caller: CallModel) {
    const userMedia = await devicesPermission(caller.type);
    if (!userMedia) return safeLog("No peer or devices");
    setSelectAnswer(caller);
    const callConnection = CallObserver.get(caller.id);
    if (!callConnection) return;
    callConnection.answer(userMedia);
  }, []);

  const stop = useCallback(() => {
    if (!selectAnswer) return;
    setSelectAnswer(undefined);
    const callConnection = CallObserver.get(selectAnswer.id);
    if (!callConnection) return;
    callConnection.close();
    CallObserver.delete(selectAnswer.id);
    //  handle remove
  }, [selectAnswer]);

  return {
    selectAnswer: selectAnswer,
    controller: { call, answer, stop },
  };
};

export default useCallController;
