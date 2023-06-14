import { motion, MotionProps } from "framer-motion";

// Animation
type Key = "overplay" | "container" | "item_mini" | "item_preview";
type AnimationProps = { [key in Key]: MotionProps };
const Animation = Object.freeze<AnimationProps>({
  overplay: {
    variants: {
      visible: { opacity: 1 },
      hidden: { opacity: 0 },
    },
    initial: "hidden",
    animate: "visible",
    exit: "hidden",
  },
  container: {
    variants: {
      visible: { scale: 1 },
      hidden: { scale: 0 },
    },
    transition: { duration: 0.075 },
  },
  item_mini: {
    variants: {
      visible: (index) => ({
        y: 0,
        x: 0,
        opacity: 1,
        transition: { delay: index * 0.2 + 0.1 },
      }),
      hidden: {
        opacity: 0,
        y: -20,
        x: -20,
      },
    },
  },
  item_preview: {
    variants: {
      visible: { scale: 1, transition: { delay: 0.2 } },
      hidden: { scale: 0 },
    },
  },
});

// eslint-disable-next-line
export default {
  Animation,
};
