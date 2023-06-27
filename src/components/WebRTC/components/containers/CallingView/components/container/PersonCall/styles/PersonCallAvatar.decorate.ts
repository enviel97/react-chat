import { motion, MotionProps } from "framer-motion";
import styled from "styled-components";

interface PersonCallAnimation {
  mask: MotionProps;
  wave: MotionProps;
}

export const PersonCallAvatarContainer = styled(motion.div)`
  position: relative;
  border-radius: 50%;
`;

export const PersonCallAvatarMask = styled(motion.div)`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  border-radius: 50%;
  background-color: var(--back);
`;

export const PersonCallWave = styled(motion.div)`
  position: absolute;
  top: 0;
  border-radius: inherit;
  height: 100%;
  width: 100%;
`;

export const Animation = Object.freeze<PersonCallAnimation>({
  mask: {
    variants: {
      normal: { opacity: 0.5 },
      talking: { opacity: 0 },
    },
    initial: "normal",
  },
  wave: {
    variants: {
      normal: { scale: 1, color: "var(--surface-color)" },
      talking: { scale: 1.2, color: "var(--success-color)" },
    },
    initial: "normal",
    style: {
      backgroundColor: "currentColor",
      boxShadow: [
        `0 0 1px currentColor`,
        `0 0 2px currentColor`,
        `0 0 3px currentColor`,
        `0 0 4px currentColor`,
        `0 0 5px currentColor`,
        `0 0 6px currentColor`,
      ].join(","),
    },
  },
});
