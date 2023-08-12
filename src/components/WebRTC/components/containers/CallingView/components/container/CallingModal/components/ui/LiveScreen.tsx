import { AnimatePresence, motion } from "framer-motion";
import { memo, useEffect, useRef, FC } from "react";
import styled from "styled-components";

interface LiveScreenProps {
  stream?: MediaStream;
}

const LiveScreenWrapper = styled(motion.video)`
  height: 100%;
  width: 100%;
  object-fit: cover;
  background-color: var(--background-color);
`;

const variants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const LiveScreen: FC<LiveScreenProps> = ({ stream }) => {
  const target = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = target.current;
    if (!stream || !video) return;
    video.srcObject = stream;
    video.onloadedmetadata = video.play;
  }, [stream]);

  return (
    <AnimatePresence>
      {stream && (
        <LiveScreenWrapper
          variants={variants}
          initial='hidden'
          animate='visible'
          exit='hidden'
          autoPlay
          playsInline
          preload='auto'
          controls={false}
          ref={target}
        />
      )}
    </AnimatePresence>
  );
};

export default memo(LiveScreen);
