import { FC } from "react";
import VideoAction from "./components/ui/VideoAction";
import {
  PersonCallAction,
  PersonCallActionGroups,
  PersonCallContainer,
} from "./styles/PersonCall.decorate";
import useAudio from "./hooks/useAudio";
import useWebcam from "./hooks/useWebcam";
import InformationCall from "./components/container/InformationCall";
import usePropsState from "@hooks/usePropsState";
import LiveScreen from "./components/ui/LiveScreen";

interface PersonCallProps {
  stream?: MediaStream;
  microphone?: boolean;
  webcam?: boolean;
  metadata: CallMetaData;
  isConnected?: boolean;
  isRemote?: boolean;
}

const PersonCall: FC<PersonCallProps> = ({
  stream,
  microphone = false,
  webcam = false,
  metadata,
  isRemote = false,
  isConnected = false,
}) => {
  const { audio, handleLiveAudio } = useAudio(stream, microphone);
  const { live, handleLiveScreen } = useWebcam(stream, webcam);
  const [connected] = usePropsState(isConnected);

  return (
    <PersonCallContainer>
      <LiveScreen stream={stream} />
      <PersonCallActionGroups>
        <InformationCall
          name={metadata.name}
          avatar={metadata.avatar}
          isRemote={isRemote}
          camera={live}
          isConnected={connected}
        />
        <PersonCallAction>
          <VideoAction
            type='Camera'
            on={live}
            onClick={handleLiveScreen}
            disabled={!connected}
          />
          <VideoAction
            type='Audio'
            on={audio}
            onClick={handleLiveAudio}
            disabled={!connected}
          />
          {/* TODO: Volume modified */}
        </PersonCallAction>
      </PersonCallActionGroups>
    </PersonCallContainer>
  );
};

export default PersonCall;
