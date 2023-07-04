interface StatusProps {
  $status?: UserStatus;
  $bio?: boolean;
}

interface NameProps {
  $isOnline?: boolean;
}

interface AvatarContainerProps {
  $isOnline?: boolean;
}

interface FriendListItemProps {
  friendId: string;
  isOnline?: boolean;
}
interface FriendListItemSubProps {
  profileId: string;
  isOnline: boolean;
}
