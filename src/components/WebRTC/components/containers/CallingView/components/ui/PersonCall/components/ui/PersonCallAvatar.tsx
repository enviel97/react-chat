import CircleAvatar from "@pages/Main/components/ui/CircleAvatar";
import { AnimatePresence } from "framer-motion";
import { FC, useEffect, useState } from "react";
import {
  PersonCallWave,
  Animation,
  PersonCallAvatarContainer,
  PersonCallMask,
} from "../../styles/PersonCallAvatar.decorate";

interface PersonCallAvatarProps {
  peerId: string;
  src?: string;
  isTalking?: boolean;
}

const PersonCallAvatar: FC<PersonCallAvatarProps> = ({
  src,
  isTalking = false,
}) => {
  const [talking, setTalking] = useState<boolean>(isTalking);

  useEffect(() => {
    setTalking(isTalking);
  }, [isTalking]);

  return (
    <PersonCallAvatarContainer
      variants={{
        audio: { height: "10rem" },
        video: { height: "4rem" },
      }}
    >
      <AnimatePresence>
        {talking && <PersonCallWave {...Animation.wave} />}
      </AnimatePresence>
      <CircleAvatar src={src} viewPort='md' size={"100%"} />
      <AnimatePresence>{talking && <PersonCallMask />}</AnimatePresence>
    </PersonCallAvatarContainer>
  );
};

export default PersonCallAvatar;
