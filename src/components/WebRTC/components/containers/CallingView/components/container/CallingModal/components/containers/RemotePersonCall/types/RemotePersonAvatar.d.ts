type RemotePersonAvatarVariants = "webcam_on" | "webcam_off";

interface RemotePersonAvatarProps {
  src?: string;
  variants?: RemotePersonAvatarVariants;
  isConnecting?: boolean;
}

interface RemotePersonAvatarAnimate<T> {
  Wave: T;
}

interface RemotePersonAvatarContainer {
  $animate: RemotePersonAvatarVariants;
}
