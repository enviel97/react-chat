import { CallAvatarContainerShadow } from "@components/WebRTC/utils/shaddow";
import { motion, MotionProps } from "framer-motion";
import styled from "styled-components";

interface PersonCallAnimation {
  mask: MotionProps;
  wave: MotionProps;
}

export const PersonCallWave = styled(motion.div)`
  position: absolute;
  border-radius: inherit;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`;

export const PersonCallAvatarContainer = styled(motion.div)`
  border-radius: 50%;
  box-shadow: ${CallAvatarContainerShadow};
`;

export const PersonCallMask = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  border-radius: 50%;
  background-color: var(--background-color);
`;

export const Animation = Object.freeze<PersonCallAnimation>({
  mask: {
    variants: {
      normal: { opacity: 0.7 },
      talking: { opacity: 0 },
    },
    initial: "normal",
    animate: "talking",
  },
  wave: {
    variants: {
      normal: { scale: 1, color: "var(--surface-color)" },
      talking: { scale: 1.2, color: "var(--success-color)" },
    },
    initial: "normal",
    animate: "talking",
    style: {
      boxShadow: [0.1, 0.2]
        .map((blur) => `0 0 ${blur}em currentColor`)
        .join(","),
    },
  },
});
