import { palette } from "@theme/helper/palette";
import { MotionProps } from "framer-motion";

export const DisplayContainerAnimate: MotionProps = {
  variants: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  transition: { type: "spring", stiffness: 700, damping: 30 },
  animate: "visible",
  initial: "hidden",
};

export const AnimationColor: MotionProps = {
  variants: {
    error: { color: palette.dark.notificationColor },
    success: { color: palette.dark.successColor },
    pending: { color: palette.dark.primaryColor },
  },

  transition: { duration: 0.5 },
};
