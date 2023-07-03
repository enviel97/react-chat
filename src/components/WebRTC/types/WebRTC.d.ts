type CallType = "VideoCall" | "PhoneCall";

interface CallModel {
  id: string;
  type: CallType;
}

interface IWebRTCContext<Socket> {
  peer?: Socket;
  call: (receiver: CallModel) => void;
}

interface CallMetaData {
  name: string;
  avatar?: string;
}
type FATAL_ERRORS =
  | "invalid-id"
  | "invalid-key"
  | "network"
  | "ssl-unavailable"
  | "server-error"
  | "socket-error"
  | "socket-closed"
  | "unavailable-id"
  | "webrtc";

interface PeerError extends Error {
  type: FATAL_ERRORS;
}
