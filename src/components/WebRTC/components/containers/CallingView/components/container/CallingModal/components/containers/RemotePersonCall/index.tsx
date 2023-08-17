import { FC, memo } from "react";
import IconToggle from "./components/IconToggle";
import useAudio from "../../../hooks/useAudio";
import useWebcam from "../../../hooks/useWebcam";
import LiveScreen from "../../ui/LiveScreen";
import RemotePersonAvatar from "./components/RemotePersonAvatar";
import {
  PersonCallAction,
  PersonCallContainer,
} from "./styles/RemotePersonCall.decorate";
import CallingActionHint from "../../ui/CallingActionHint";
import string from "@utils/string";
import CallingAction from "../../ui/CallingAction";

interface RemotePersonCallProps {
  avatar?: string;
  stream?: MediaStream;
  camera?: boolean;
  microphone?: boolean;
  status: CallStatus;
  callId: string;
}

const RemotePersonCall: FC<RemotePersonCallProps> = ({
  stream,
  avatar,
  camera,
  microphone,
  status,
  callId,
}) => {
  const { live, handleLiveScreen } = useWebcam(stream, camera);
  const { handleLiveAudio } = useAudio(stream, microphone);
  const tooltipId = string.genId("LocalActionTooltip");

  return (
    <PersonCallContainer>
      <LiveScreen stream={stream} />
      <RemotePersonAvatar
        src={avatar}
        isConnecting={status === "connection"}
        variants={live ? "webcam_on" : "webcam_off"}
      />
      <CallingAction callId={callId} status={status} />
      <PersonCallAction>
        <CallingActionHint id={tooltipId}>
          <IconToggle
            name='Webcam'
            onClick={handleLiveScreen}
            disabled={!stream}
            defaultChecked={true}
            data-tooltip-id={tooltipId}
          />
          <IconToggle
            name='Audio'
            onClick={handleLiveAudio}
            disabled={!stream}
            defaultChecked={false}
            data-tooltip-id={tooltipId}
          />
        </CallingActionHint>
      </PersonCallAction>
    </PersonCallContainer>
  );
};
export default memo(RemotePersonCall);
