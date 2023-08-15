import { MotionProps } from "framer-motion";

type Animate = LocalPersonCallAnimate<MotionProps>;

const LocalPersonCallAnimate = Object.freeze<Animate>({
  Container: {
    variants: {
      collapsed: { x: "100%" },
      expanded: { x: 0 },
    },
  },
});

export default LocalPersonCallAnimate;
