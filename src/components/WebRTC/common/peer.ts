import type { MediaConnection } from "peerjs";

const CallObserver = new Map<string, MediaConnection>([]);

export default CallObserver;
