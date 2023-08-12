type RemotePersonAvatarVariants = "webcam_on" | "webcam_off";

interface RemotePersonAvatarProps {
  src?: string;
  variants?: RemotePersonAvatarVariants;
  isConnected?: boolean;
}

interface RemotePersonAvatarAnimate<T> {
  Container: T;
  Wave: T;
}

interface RemotePersonAvatarContainer {
  $animate: RemotePersonAvatarVariants;
}
