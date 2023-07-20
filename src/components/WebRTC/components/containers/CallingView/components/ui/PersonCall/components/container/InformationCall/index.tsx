import { FC } from "react";
import { PersonCallAnimation } from "./styles/InformationCall.decorate";
import {
  PersonCallAvatarContainer,
  PersonCallInfoContainer,
  PersonCallName,
  PersonConnectionWave,
} from "./styles/InformationCall.animate";
import PersonCallAvatar from "../../ui/PersonCallAvatar";
import { AnimatePresence } from "framer-motion";

interface InformationCallProps {
  name: string;
  avatar?: string;
  camera?: boolean;
  isRemote?: boolean;
  isConnected?: boolean;
}

const InformationCall: FC<InformationCallProps> = ({
  name,
  avatar,
  camera,
  isRemote,
  isConnected,
}) => {
  return (
    <PersonCallInfoContainer
      {...PersonCallAnimation.container}
      animate={!isConnected || !camera ? "audio" : "video"}
      custom={Number(!!isRemote)}
    >
      {/* Avatar */}
      <PersonCallAvatarContainer>
        <AnimatePresence>
          {!isConnected &&
            Array.from({ length: 2 }, (_, index) => (
              <PersonConnectionWave
                {...PersonCallAnimation.calling}
                key={index}
                custom={index}
              />
            ))}
        </AnimatePresence>
        <PersonCallAvatar peerId={""} src={avatar} />
      </PersonCallAvatarContainer>

      {/* Name */}
      <AnimatePresence>
        {(!isConnected || !camera) && (
          <PersonCallName {...PersonCallAnimation.name}>{name}</PersonCallName>
        )}
      </AnimatePresence>
    </PersonCallInfoContainer>
  );
};

export default InformationCall;
