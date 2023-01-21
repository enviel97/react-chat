interface ButtonIconProps {
  icon: any;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  itemType?: string;
  circle?: boolean;
  hint?: string;
  hintPosition?: "top" | "left" | "right" | "bottom";
  hintBackgroundColor?: string;
}
