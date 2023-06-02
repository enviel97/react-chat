type ActionCallback = (value: UserProfile) => void;

interface FriendActionDropdownProps {
  onAction: (callback?: ActionCallback) => void;
}

interface ItemProps {
  $hoverColor?: string;
}
