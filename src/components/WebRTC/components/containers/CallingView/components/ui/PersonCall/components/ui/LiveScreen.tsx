import { safeLog } from "@core/api/utils/logger";
import { AnimatePresence, motion } from "framer-motion";
import { memo, useEffect, useRef, useCallback, FC, useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";

interface LiveScreenProps {
  stream?: MediaStream;
}

const LiveScreenWrapper = styled(motion.video)`
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
  }, [stream]);

  return (
    <AnimatePresence>
      {stream && (
        <LiveScreenWrapper
          variants={{
            visible: { opacity: 1 },
            hidden: { opacity: 0 },
          }}
          initial='hidden'
          animate='visible'
          exit='hidden'
          autoPlay
          preload='none'
          ref={target}
        />
      )}
    </AnimatePresence>
  );
};

export default memo(LiveScreen);
