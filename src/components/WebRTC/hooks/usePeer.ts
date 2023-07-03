import { safeLog } from "@core/api/utils/logger";
import useAppDispatch from "@hooks/useAppDispatch";
import useAppSelector from "@hooks/useAppSelector";
import useAuthenticate from "@hooks/useAuthenticate";
import { initial, selectPeer } from "@store/slices/call";
import { useEffect } from "react";

const usePeer = () => {
  const { userId } = useAuthenticate();
  const peer = useAppSelector(selectPeer);
  const dispatch = useAppDispatch();

  // init one
  useEffect(() => {
    if (!userId) return;
    // dispatch(initial(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    // Listener
    if (!peer) return;
    peer.on("error", (error) => {
      const peerError = error as PeerError;
      const type = peerError.type;
      safeLog({ error });

      peer.on("disconnected", (id) => {
        if (type && type === "network") {
          console.log(`"Disconnected ${id}"`);
          peer.reconnect();
          return;
        }
      });
    });
    return () => {
      peer.off("disconnected");
      peer.off("error");

      // Disconnect
      if (!peer.open) return;
      peer.disconnect();
      peer.destroy();
    };
  }, [peer]);
};

export default usePeer;
