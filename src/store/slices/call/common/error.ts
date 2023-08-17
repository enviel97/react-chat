type CallError = {
  [key in CallErrorType]: { type: CallErrorType; message: string };
};

export const CallErrorMapping = Object.freeze<CallError>({
  "peer-unavailable": {
    type: "peer-unavailable",
    message: "Connect to call channel failure, please restart and try again",
  },
  "peer-missing": {
    type: "peer-missing",
    message: "User missing call",
  },
  "devices-permission": {
    type: "devices-permission",
    message: "This feature required a microphone and/or camera",
  },
  unknown: {
    type: "unknown",
    message: "Error not found",
  },
  "user-unavailable": {
    type: "user-unavailable",
    message: "Your friend currently offline",
  },
  "user-disable": {
    type: "user-disable",
    message: "User is disabled suddenly",
  },
});
