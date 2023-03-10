interface ListFriendProps {
  groupTitle: string;
  data?: User[];
}

interface FriendItemProps {
  user: User;
}

interface FriendAvatarProps {
  userActive: "online" | "offline";
}
