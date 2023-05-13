import { MotionProps } from "framer-motion";

export const AnimationItem: MotionProps = {
  variants: {
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
      },
    }),
    hidden: {
      opacity: 0,
      y: -10,
    },
    exit: (i) => ({
      y: -10,
      opacity: 0,
      pointerEvents: "none",
      transition: {
        duration: i === 0 ? 0 : 0.3,
      },
    }),
  },
  animate: "visible",
  initial: "hidden",
  exit: "exit",
  transition: {
    layout: { duration: 0.3 },
  },
};
