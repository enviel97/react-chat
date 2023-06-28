import type { MotionProps } from "framer-motion";

type Component = "system" | "card";
type AnimationFriendRequest = { [key in Component]: MotionProps };

export const Animate: AnimationFriendRequest = {
  system: {
    variants: { visible: { opacity: 1 }, hidden: { opacity: 0 } },
    animate: "visible",
    initial: "hidden",
    exit: "hidden",
  },
  card: {
    variants: {
      visible: (i) => ({
        x: 0,
        opacity: 1,
        transition: { delay: i * 0.1 },
      }),
      hidden: {
        x: -10,
        opacity: 0,
      },
    },
    layout: true,
    initial: "hidden",
    animate: "visible",
    exit: "hidden",
  },
};
