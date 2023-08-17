import { FC, useEffect } from "react";
import Styles from "./styles/LocalPersonCall.decorate";
import Animate from "./styles/LocalPersonCall.animate";
import LiveScreen from "../../ui/LiveScreen";
import SlideButton from "./components/SlideButton";
import { useAnimationControls } from "framer-motion";
import ActionButton from "./components/ActionButton";
import useWebcam from "../../../hooks/useWebcam";
import useAudio from "../../../hooks/useAudio";
import CallingActionHint from "../../ui/CallingActionHint";
import string from "@utils/string";

const LocalPersonCall: FC<LocalPersonCallProps> = ({
  stream,
  microphone,
  camera,
  expanded,
}) => {
  const controls = useAnimationControls();
  const duration = 0.8;
  const { handleLiveScreen } = useWebcam(stream, camera);
  const { handleLiveAudio } = useAudio(stream, microphone);
  const tooltipId = string.genId("LocalActionTooltip");

  useEffect(() => {
    if (expanded) controls.set("expanded");
    else controls.set("collapsed");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expanded]);

  const handleExpanded = (isExpanded: boolean) => {
    if (isExpanded) controls.start("collapsed");
    else controls.start("expanded");
  };

  return (
    <Styles.Container
      {...Animate.Container}
      animate={controls}
      transition={{ duration }}
    >
      <Styles.ActionContainer>
        <SlideButton
          animateDuration={1}
          onClick={handleExpanded}
          defaultState={!expanded}
        />
        <Styles.ActionStreamContainer>
          <CallingActionHint id={tooltipId}>
            <ActionButton
              iconName={"Webcam"}
              disabled={!stream}
              defaultState={camera}
              onClick={handleLiveScreen}
              data-tooltip-id={tooltipId}
            />
            <ActionButton
              iconName={"Audio"}
              disabled={!stream}
              defaultState={microphone}
              onClick={handleLiveAudio}
              data-tooltip-id={tooltipId}
            />
          </CallingActionHint>
        </Styles.ActionStreamContainer>
      </Styles.ActionContainer>
      <Styles.LiveContainer>
        <LiveScreen stream={stream} />
      </Styles.LiveContainer>
    </Styles.Container>
  );
};

export default LocalPersonCall;
