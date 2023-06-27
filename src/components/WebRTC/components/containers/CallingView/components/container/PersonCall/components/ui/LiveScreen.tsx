import { safeLog } from "@core/api/utils/logger";
import { memo, useEffect, useRef, FC } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";

interface LiveScreenProps {
  stream?: MediaStream;
}

const LiveScreenWrapper = styled.video`
  height: 100%;
  width: 100%;
  object-fit: contain;
`;

const LiveScreen: FC<LiveScreenProps> = ({ stream }) => {
  const target = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = target.current;
    if (!stream || !video) return;
    video.srcObject = stream;
    const promise = video.play();
    if (!promise) return;
    promise
      .then(() => {})
      .catch((error) => {
        safeLog({ error });
        toast.error("Live screen error");
      });

    return () => {
      const currentSrc = video.srcObject as MediaStream;
      if (!currentSrc) return;
      currentSrc.getTracks().forEach((track) => track.stop());
    };
  }, [stream]);

  // useImperativeHandle(ref, () => ({}), []);
  return <LiveScreenWrapper ref={target} preload='auto' />;
};

export default memo(LiveScreen);
