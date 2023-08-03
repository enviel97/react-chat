/**
 * Call state define
 */
type CallStatus = "connection" | "calling" | "answer" | "ended" | "error";

interface CallModel {
  connectionId: string;
  connecterId: string;
  name: string;
  avatar?: string;
  type: CallType;
  status: CallStatus;
}
