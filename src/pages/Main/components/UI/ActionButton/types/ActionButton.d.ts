interface IconProvider {
  className?: string;
  iconName: LabelIcon;
  isSelected: boolean;
}

type LabelIcon = "Conversation" | "Profiles" | "Sign out";

interface ActionButtonProps {
  icon: LabelIcon;
  to: string;
  state?: any;
  onClick?: () => void;
}
