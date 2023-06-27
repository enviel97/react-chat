import { safeLog } from "@core/api/utils/logger";
import useAppSelector from "@hooks/useAppSelector";
import { selectUser } from "@store/slices/profiles";
import Peer from "peerjs";
import { useEffect, useState } from "react";
import CallObserver from "../common/peer";

const usePeer = () => {
  const user = useAppSelector(selectUser);

  // init one
  const [peer, setPeer] = useState<Peer>();
  const [state, setState] = useState<State>("Idle");

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
      setState("Connected");
    });
    peer.on("close", () => {
      setState("Destroyed");
      console.log(`"Close ${peer.id}"`);
    });
    peer.on("disconnected", (id) => {
      CallObserver.delete(id);
      setState("Disconnected");
      console.log(`"Disconnect ${peer.id}"`);
    });
    peer.on("error", (error) => {
      safeLog({ error });
      setState("Error");
    });
    return () => {
      peer.destroy();
    };
  }, [peer]);

  return { peer, state };
};

export default usePeer;
