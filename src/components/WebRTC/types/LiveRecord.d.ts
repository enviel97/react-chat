interface LiveRecordProps {}

interface LiveRecordController {
  on: () => void;
  off: () => void;
  mute: () => void;
  unmute: () => void;
}
