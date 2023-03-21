import { Variants } from "framer-motion";

export const MenuContextAnimation: Variants = {
  enter: {
    opacity: 1,
    rotateX: 0,
    transition: {
      duration: 0.25,
    },
    display: "block",
  },
  exit: {
    opacity: 0,
    rotateX: -15,
    transition: {
      duration: 0.25,
    },
    transitionEnd: {
      display: "none",
    },
  },
};
