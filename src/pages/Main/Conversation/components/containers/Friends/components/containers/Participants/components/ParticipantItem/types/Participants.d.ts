interface FriendItemProps {
  user: User;
  role?: Role;
  canBanned?: boolean;
  currentStatus?: boolean;
}

type StatusActions = "online" | "offline";

interface StatusUserPayload {
  id: string;
  message: string;
  action: StatusActions;
}
