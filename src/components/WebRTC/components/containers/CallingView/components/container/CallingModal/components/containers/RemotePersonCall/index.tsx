import useAppSelector from "@hooks/useAppSelector";
import { selectRemoteInfo } from "@store/slices/call/selectors/call.selector";
import { FC, memo } from "react";
import IconToggle from "../../../../../ui/IconToggle";
import useAudio from "../../../hooks/useAudio";
import useWebcam from "../../../hooks/useWebcam";
import LiveScreen from "../../ui/LiveScreen";
import RemotePersonAvatar from "./components/RemotePersonAvatar";
import {
  PersonCallAction,
  PersonCallContainer,
} from "./styles/RemotePersonCall.decorate";

interface RemotePersonCallProps {
  stream?: MediaStream;
}

const RemotePersonCall: FC<RemotePersonCallProps> = ({ stream }) => {
  const remoteInfo = useAppSelector(selectRemoteInfo);
  const { live, handleLiveScreen } = useWebcam(stream, true);
  const { handleLiveAudio } = useAudio(stream);
  return (
    <PersonCallContainer>
      <LiveScreen stream={stream} />
      <RemotePersonAvatar
        src={remoteInfo?.avatar}
        isConnected={!!stream}
        variants={live ? "webcam_on" : "webcam_off"}
      />
      <PersonCallAction>
        <IconToggle
          name='Webcam'
          onClick={handleLiveScreen}
          disabled={!stream}
          defaultChecked={true}
        />
        <IconToggle
          name='Audio'
          onClick={handleLiveAudio}
          disabled={!stream}
          defaultChecked={false}
        />
      </PersonCallAction>
    </PersonCallContainer>
  );
};
export default memo(RemotePersonCall);
