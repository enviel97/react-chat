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
        scaleY: 1,
        opacity: 1,
        translateX: `min(0px, calc(100svw - 100% - ${left}px))`,
        transition: { duration: 0.2 },
      },
      exit: {
        y: top,
        x: left,
        scaleY: 0,
        opacity: 0,
        translateX: 0,
        transition: { duration: 0 },
      },
    },
    initial: "exit",
    animate: "enter",
    style: {
      top: 0,
      left: 0,
      originX: 0,
      originY: "top",
    },
  });
