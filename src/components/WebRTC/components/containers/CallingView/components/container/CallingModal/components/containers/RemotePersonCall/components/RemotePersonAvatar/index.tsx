import { FC, useMemo } from "react";
import Styles from "./styles/RemotePersonAvatar.decorate";
import Animate from "./styles/RemotePersonAvatar.animate";
import CircleAvatar from "@pages/Main/components/ui/CircleAvatar";

const RemotePersonAvatar: FC<RemotePersonAvatarProps> = ({
  src,
  variants = "webcam_on",
  isConnected,
}) => {
  const Wave = useMemo(() => {
    if (isConnected) return null;
    return Array.from({ length: 2 }, (_, index) => {
      return <Styles.Waiting {...Animate.Wave} key={index} custom={index} />;
    });
  }, [isConnected]);

  return (
    <Styles.Container $animate={variants} layout>
      <Styles.Avatar $animate={variants} layout>
        {Wave}
        <CircleAvatar src={src} viewPort='sm' size={"100%"} />
      </Styles.Avatar>
    </Styles.Container>
  );
};

export default RemotePersonAvatar;
