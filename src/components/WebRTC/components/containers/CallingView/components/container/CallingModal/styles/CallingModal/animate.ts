import type { MotionProps } from "framer-motion";
type Component = "Container";
type CallingModalAnimateProps = { [key in Component]: MotionProps };
const CallingModalAnimate = Object.freeze<CallingModalAnimateProps>({
  Container: {
    initial: { scale: 0.5, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
  },
});

export default CallingModalAnimate;
