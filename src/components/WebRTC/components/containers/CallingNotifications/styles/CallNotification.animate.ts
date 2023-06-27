import { MotionProps } from "framer-motion";

type Animation = {
  item: MotionProps;
};

export const CallNotificationAnimation: Animation = {
  item: {
    variants: {
      animate: (i) => ({
        x: 0,
        opacity: 1,
        transition: {
          delay: i * 0.1,
        },
      }),
      initial: { x: 100, opacity: 0 },
      exit: { x: 0, scale: 0, opacity: 0 },
    },
    initial: "initial",
    animate: "animate",
    exit: "exit",
  },
};
