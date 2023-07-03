import useAppDispatch from "@hooks/useAppDispatch";
import useAppSelector from "@hooks/useAppSelector";
import useAuthenticate from "@hooks/useAuthenticate";
import { closeCallView, openCallView, selectPeer } from "@store/slices/call";
import { useCallback } from "react";
import { toast } from "react-toastify";
import { devicesPermission } from "../utils/permission";

interface DeviceSetup {
  camera?: boolean;
}

const useCallController = () => {
  const dispatch = useAppDispatch();
  const peer = useAppSelector(selectPeer);
  const { user } = useAuthenticate();

  const trigger = useCallback(
    async (receiver: string, callOptions: DeviceSetup) => {
      if (!peer || !user) {
        toast.error("Call server connect error");
        return;
      }
      const mediaCall = await devicesPermission(callOptions);
      if (!mediaCall) return;
      dispatch(openCallView(receiver));
      const connection = peer.connect(receiver);
      if (!connection) {
        toast.error("Call failure");
        dispatch(closeCallView());
        mediaCall.close();
        return;
      }
      connection.on("open", () => {
        connection.send({
          name: user.getFullName(),
          avatar: user.profile?.avatar,
        });

        console.log({ call: "connection" });

        peer.call(receiver, mediaCall, {
          metadata: {
            type: callOptions.camera ? "VideoCall" : "PhoneCall",
          },
        });
      });
    },
    [peer, dispatch, user]
  );

  return { trigger };
};

export default useCallController;
