interface KOptions {
  label: string;
  icon: any;
  onClick: (item: User) => void | Promise<void>;
}

interface ListFriendProps {
  groupTitle: string;
  data?: User[];
  role?: ParticipantRole;
  options?: KOptions[];
}

interface FriendItemProps {
  user: User;
  role?: Role;
}

interface FriendAvatarProps {
  userActive: "online" | "offline";
}
