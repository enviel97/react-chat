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
