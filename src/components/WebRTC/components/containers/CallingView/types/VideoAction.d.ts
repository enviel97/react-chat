type VideoIconType = "Audio" | "Camera" | "Screen";
type VideoActionMap = { [key in ActionState]: React.ReactNode };

interface VideoActionProps {
  type: VideoIconType;
  on?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}
