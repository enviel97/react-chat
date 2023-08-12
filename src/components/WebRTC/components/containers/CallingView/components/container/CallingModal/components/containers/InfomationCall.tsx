import { FC } from "react";
import { AnimatePresence } from "framer-motion";
import {
  PersonCallAvatarContainer,
  PersonCallInfoContainer,
  PersonCallName,
  PersonConnectionWave,
} from "../../styles/InfomationCall/decorate";
import { PersonCallAnimation } from "../../styles/InfomationCall/animate";
import PersonCallAvatar from "../ui/PersonCallAvatar";

interface InformationCallProps {
  name?: string;
  avatar?: string;
  camera?: boolean;
  isRemote?: boolean;
  isConnected?: boolean;
}

const InformationCall: FC<InformationCallProps> = ({
  // Infomation
  name,
  avatar,

  // state
  camera,

  // type
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
        {/* Is Calling  */}
        {(!isConnected || !camera) && (
          <PersonCallName {...PersonCallAnimation.name}>{name}</PersonCallName>
        )}
      </AnimatePresence>
    </PersonCallInfoContainer>
  );
};

export default InformationCall;
