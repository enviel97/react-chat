type CallType = "VideoCall" | "PhoneCall";

interface CallMetaData {
  name: string;
  avatar?: string;
}
type FATAL_ERRORS =
  | "browser-incompatible"
  | "disconnected"
  | "invalid-id"
  | "invalid-key"
  | "network"
  | "peer-unavailable"
  | "ssl-unavailable"
  | "server-error"
  | "socket-error"
  | "socket-closed"
  | "unavailable-id"
  | "webrtc";

interface PeerError extends Error {
  type: FATAL_ERRORS;
}

interface CallInfo {
  id: string;
  name: string;
  avatar?: string;
  createdAt: string;
}

interface IncomingCall {
  callId: string;
  user: CallInfo;
  callType: CallType;
}

type CallSuccess = "calling" | "accept" | "reject";

interface CallPayload<Data> {
  type: "calling" | "accept" | "reject";
  data: Data;
}

interface CallAckPayload {
  from: string;
  to: string;
}

interface CallAcceptPayload extends CallAckPayload {
  callId: string;
}

interface CallErrorP2PErrorPayload {
  from: string;
  callId: string;
}

type CallErrorPayload =
  | { type: "user-unavailable" }
  | { type: "p2p-unavailable"; data: CallErrorP2PErrorPayload };
