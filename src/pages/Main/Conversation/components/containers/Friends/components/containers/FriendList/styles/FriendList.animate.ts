import { MotionProps } from "framer-motion";

type AnimateProps = {
  item: MotionProps;
  name: MotionProps;
  status: MotionProps;
};

export const FriendListAnimate: AnimateProps = {
  item: {
    variants: {
      visible: (i) => ({ opacity: 1, transition: { delay: i * 0.2 } }),
      hidden: { opacity: 0, transition: { duration: 0 } },
    },
    initial: "hidden",
    animate: "visible",
    exit: "hidden",
  },
  name: {
    variants: {
      visible: { scaleX: 1, opacity: 1 },
      hidden: { scaleX: 0, opacity: 0 },
    },
    transition: { delay: 0.3, bounce: 0 },
    style: { originY: "top", originX: "left", scaleY: 1 },
  },
  status: {
    variants: {
      visible: { scaleX: 1, opacity: 1 },
      hidden: { scaleX: 0, opacity: 0 },
    },
    transition: { delay: 0.4, bounce: 0 },
    style: { originY: "top", originX: "left", scaleY: 1 },
  },
};
