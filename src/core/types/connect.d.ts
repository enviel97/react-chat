type LoadState = "idle" | "loading" | "success" | "error";

interface AudioSetting {
  type: "audio";
  deviceId: "default";

  channelCount: 1 | 2;
  autoGainControl: boolean;
  echoCancellation: boolean;
  groupId: string;
  noiseSuppression: boolean;
  sampleRate: 48000;
  sampleSize: 16;
  latency: 0.01;
}
