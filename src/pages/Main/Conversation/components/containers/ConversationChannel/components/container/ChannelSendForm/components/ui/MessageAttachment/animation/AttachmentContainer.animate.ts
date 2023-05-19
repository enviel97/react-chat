import { MotionProps } from "framer-motion";

export const AnimationContainer: MotionProps = {
  variants: {
    visible: {
      height: 150,
      opacity: 1,
      transition: {
        duration: 0.2,
      },
    },
    hidden: {
      height: 0,
      opacity: 0,
      transition: {
        height: { duration: 0.25 },
        opacity: { duration: 0 },
      },
    },
  },
  animate: "visible",
  initial: "hidden",
  exit: "hidden",
};
