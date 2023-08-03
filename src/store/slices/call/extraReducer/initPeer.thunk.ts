import { fetchProfile } from "@store/repo/user";
import { CallExtraBuilder } from "@store/slices/state/call";
import Peer from "peerjs";
const iceServers = [
  // Stun
  { url: "stun:stun.l.google.com:19302" },
  { url: "stun:stun1.l.google.com:19302" },
  { url: "stun:stun2.l.google.com:19302" },
  { url: "stun:stun3.l.google.com:19302" },
  { url: "stun:stun4.l.google.com:19302" },
  // Turn
  {
    url: "turn:relay.backups.cz",
    credential: "webrtc",
    username: "webrtc",
  },
  {
    url: "turn:relay.backups.cz?transport=tcp",
    credential: "webrtc",
    username: "webrtc",
  },
];
const initPeerThunk = (builder: CallExtraBuilder) => {
  builder.addCase(fetchProfile.fulfilled, (state, action) => {
    const peer = state.peer;
    if (!peer || peer.destroyed) {
      state.peer = new Peer(action.payload.user.getId(), {
        config: { iceServers: iceServers },
      });
      return;
    }
    if (peer.disconnected) {
      peer.reconnect();
    }
  });
};

export default initPeerThunk;
