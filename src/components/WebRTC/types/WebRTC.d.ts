/**
 * Enum
 */
type CallType = "VideoCall" | "PhoneCall";

type CallErrorType =
  | "peer-unavailable"
  | "peer-missing"
  | "devices-permission"
  | "unknown"
  | "user-unavailable"
  | "user-disable";

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

type CallSuccessType = "calling" | "accept" | "reject";

/**
 * Interface
 */
interface CallMetaData {
  name: string;
  avatar?: string;
}

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

interface CallPayload<Data> {
  type: CallSuccessType;
  data: Data;
}

interface CallErrorPayload<Data = any> {
  type: CallErrorType;
  data: Data;
}

interface CallAcceptPayload {
  callId: string;
  connecterId: string;
}

interface CallErrorP2PErrorPayload {
  from: string;
  callId: string;
}

interface Payload {
  callId: string;
  from: string;
  to: string;
}

type CallRejectPayload = { type: "reject"; data: Payload };
