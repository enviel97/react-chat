import { MotionProps } from "framer-motion";

export const PreviewAnimation: MotionProps = {
  variants: {
    hidden: { scale: 0, display: "none" },
    visible: { scale: 1, display: "initial" },
  },
};

export const PreviewAddButtonAnimation: MotionProps = {
  transition: { duration: 0.5 },
};

export const PreviewImageAnimation: MotionProps = {
  initial: "hidden",
  exit: "hidden",
  animate: "visible",
  transition: { type: "spring", stiffness: 700, damping: 30 },
  variants: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
};
