import { MotionProps } from "framer-motion";
interface ClickPointer {
  top: number;
  left: number;
}
export const MenuContextAnimation = ({ top, left }: ClickPointer) =>
  Object.freeze<MotionProps>({
    variants: {
      enter: {
        y: top,
        x: left,
        opacity: 1,
        rotateX: 0,
        display: "block",
      },
      exit: {
        y: top - 10,
        x: left,
        opacity: 0,
        rotateX: -15,
        transitionEnd: { display: "none" },
      },
    },
    transition: { duration: 0.25 },
    initial: "exit",
    animate: "enter",
    exit: "exit",
    style: {
      originX: 0,
      originY: 0,
      top: 0,
      left: 0,
    },
  });
