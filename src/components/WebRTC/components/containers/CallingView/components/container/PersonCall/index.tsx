import { FC } from "react";
import PersonCallAvatar from "./components/ui/PersonCallAvatar";

import VideoAction from "./components/ui/VideoAction";
import {
  PersonCallAction,
  PersonCallActionGroups,
  PersonCallContainer,
} from "./styles/PersonCall.decorate";
import LiveScreen from "./components/ui/LiveScreen";
import useAudio from "./hooks/useAudio";
import useWebcam from "./hooks/useWebcam";

interface PersonCallProps {
  stream?: MediaStream;
  microphone?: boolean;
  webcam?: boolean;
  metadata: CallMetaData;
}

const PersonCall: FC<PersonCallProps> = ({
  stream,
  microphone = false,
  webcam = false,
}) => {
  const { audio, handleLiveAudio } = useAudio(stream, microphone);
  const { live, handleLiveScreen } = useWebcam(stream, webcam);

  return (
    <PersonCallContainer>
      <LiveScreen stream={stream} />
      <PersonCallActionGroups>
        <PersonCallAvatar peerId={""} />
        <PersonCallAction>
          <VideoAction type='Camera' on={live} onClick={handleLiveScreen} />
          <VideoAction type='Audio' on={audio} onClick={handleLiveAudio} />
          <div>=========</div>
        </PersonCallAction>
      </PersonCallActionGroups>
    </PersonCallContainer>
  );
};

export default PersonCall;
