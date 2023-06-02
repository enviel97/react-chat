import type { MotionProps } from "framer-motion";
export const FriendActionButtonAnimate = Object.freeze<MotionProps>({
  variants: {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  },
  whileHover: "hover",
  whileTap: "tap",
});

export const FriendActionItem = Object.freeze<MotionProps>({
  variants: {
    tap: { scale: 0.98 },
    hidden: { opacity: 0, transition: { opacity: { delay: 0.15 } } },
    visible: { opacity: 1, transition: { opacity: { delay: 0.15 } } },
  },
  whileTap: "tap",

  // display animate
  initial: "hidden",
  exit: "hidden",
  animate: "visible",
});

export const FriendActionItemContainer = Object.freeze<MotionProps>({
  variants: {
    visible: { scaleY: 1, scaleX: 1 },
    hidden: { scaleY: 0, scaleX: 0 },
  },
  initial: "hidden",
  exit: "hidden",
  animate: "visible",
  style: { originY: "top", originX: "right" },
  transition: {
    duration: 0.15,
  },
});
