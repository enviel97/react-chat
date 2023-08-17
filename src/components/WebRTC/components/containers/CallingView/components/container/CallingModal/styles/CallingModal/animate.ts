import type { MotionProps } from "framer-motion";
type Component = "Container";
type CallingModalAnimateProps = { [key in Component]: MotionProps };
const CallingModalAnimate = Object.freeze<CallingModalAnimateProps>({
  Container: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    layoutId: "CallingModal",
  },
});

export default CallingModalAnimate;
