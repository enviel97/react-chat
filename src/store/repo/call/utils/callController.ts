import type { RootState } from "@store/index";
import type { Peer } from "peerjs";

export const getPeer = (state: RootState) => {
  return new Promise<Peer>((resolve, reject) => {
    const peer = state.call.peer;
    if (!peer) return reject("peer-unavailable");
    if (peer.disconnected) peer.reconnect();
    return resolve(peer);
  });
};
