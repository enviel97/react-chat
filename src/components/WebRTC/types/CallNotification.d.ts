interface CallNotificationProps {
  connectionId: string;
  onRejectCall?: (connectionId: string) => void;
  onAnswerCall?: (connectionId: string, type: CallType) => void;
}
