import CircleAvatar from "@pages/Main/components/ui/CircleAvatar";
import { AnimatePresence } from "framer-motion";
import { FC, useEffect, useState } from "react";
import {
  PersonCallAvatarContainer,
  PersonCallAvatarMask,
  PersonCallWave,
  Animation,
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
  const [talking, setTalking] = useState<boolean>();

  useEffect(() => {
    setTalking(isTalking);
  }, [isTalking]);

  return (
    <PersonCallAvatarContainer>
      <AnimatePresence>
        {talking && <PersonCallWave {...Animation.wave} animate='talking' />}
      </AnimatePresence>
      <CircleAvatar src={src} viewPort='s' />
      <PersonCallAvatarMask
        {...Animation.mask}
        animate={talking ? "talking" : "normal"}
      />
    </PersonCallAvatarContainer>
  );
};

export default PersonCallAvatar;
