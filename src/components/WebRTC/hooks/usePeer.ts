import { safeLog } from "@core/api/utils/logger";
import useAppSelector from "@hooks/useAppSelector";
import { selectUser } from "@store/slices/profiles";
import Peer from "peerjs";
import { useEffect, useState } from "react";

const usePeer = () => {
  const user = useAppSelector(selectUser);

  // init one
  const [peer, setPeer] = useState<Peer>();

  useEffect(() => {
    setPeer((prev) => {
      if (!prev || prev.destroyed) return new Peer(user.getId());
      if (prev.disconnected) prev.reconnect();
      return prev;
    });
    // eslint-disable-next-line
  }, [user.id, user._id]);

  useEffect(() => {
    // Listener
    if (!peer) return;
    peer.on("open", (id) => {
      console.log(`Peer id: ${id}`);
    });
    peer.on("disconnected", (id) => {
      console.log(`"Disconnect ${id}"`);
    });
    peer.on("error", (error) => {
      safeLog({ error });
    });
    return () => {
      peer.off("open");
      peer.off("disconnected");
      peer.off("error");
      peer.destroy();
    };
  }, [peer]);

  return { peer };
};

export default usePeer;
