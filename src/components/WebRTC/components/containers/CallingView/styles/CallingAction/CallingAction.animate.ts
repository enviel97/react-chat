import type { MotionProps } from "framer-motion";
import { keyframes } from "styled-components";

interface Animation {
  text: MotionProps;
}

export const CallingActionAnimation = Object.freeze<Animation>({
  text: {
    variants: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
    },
    layout: true,
    initial: "initial",
    animate: "animate",
    exit: "initial",
  },
});

export const acceptLight = keyframes`
  0%, 100% {
    background-color: var(--gray);
  }
  50% {
    background-color: var(--success-color) ;
  }
`;
