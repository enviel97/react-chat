type StatusActions = "online" | "offline";

interface StatusUserPayload {
  id: string;
  message: string;
  action: StatusActions;
}
