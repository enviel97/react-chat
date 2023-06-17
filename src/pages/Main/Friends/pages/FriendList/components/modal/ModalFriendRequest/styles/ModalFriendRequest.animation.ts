import { MotionProps } from "framer-motion";

type AnimationProps = { [key in "Container" | "Item"]: MotionProps };

export const Animation: AnimationProps = {
  Container: {
    variants: {
      hidden: { height: 0, opacity: 0 },
      visible: { height: "auto", opacity: 1 },
    },
    transition: { bounce: 0 },
    initial: "hidden",
    exit: "hidden",
    animate: "visible",
  },
  Item: {
    variants: {
      visible: { x: 0, scale: 1 },
      hidden: { x: -10, scale: 0 },
    },
  },
};
