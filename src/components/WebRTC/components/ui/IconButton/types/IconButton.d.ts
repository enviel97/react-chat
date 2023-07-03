type ButtonType = "Phone" | "PhoneOff";

type CallType = "VideoCall" | "PhoneCall";

type IconCombo = { on: ReactNode; off?: ReactNode };

type IconAnimationVariants = "ring" | "call";

interface IconButtonDecorate {
  $type: ButtonType;
}

interface IconButtonProps {
  type?: ButtonType;
  animation?: IconAnimationVariants;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}
