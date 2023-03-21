interface ListFriendProps {
  groupTitle: string;
  data?: User[];
  role?: ParticipantRole;
  canBanned?: boolean;
}

interface FriendItemProps {
  user: User;
  role?: Role;
  canBanned?: boolean;
  currentStatus?: boolean;
}

interface FriendAvatarProps {
  userActive: "online" | "offline";
}
