import type { MotionProps } from "framer-motion";

interface Animation {
  overlay: MotionProps;
  container: MotionProps;
}

export const CallingViewAnimation = Object.freeze<Animation>({
  overlay: {
    variants: {
      visible: { opacity: 1 },
      hidden: { opacity: 0 },
    },
    initial: "hidden",
    animate: "visible",
  },
  container: {
    layout: true,
    variants: {
      visible: { y: 0, scale: 1 },
      hidden: { y: -100, scale: 0.5 },
    },
  },
});
