type CallType = "VideoCall" | "PhoneCall";
type State = "Idle" | "Connected" | "Destroyed" | "Disconnected" | "Error";

interface CallModel {
  id: string;
  type: CallType;
}

interface IWebRTCContext<Socket> {
  state: State;
  peer?: Socket;
  call: (receiver: CallModel) => void;
}

interface CallMetaData {
  name: string;
  avatar?: string;
}
