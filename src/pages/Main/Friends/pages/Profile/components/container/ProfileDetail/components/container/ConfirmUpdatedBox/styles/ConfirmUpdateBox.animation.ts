import { colorBrightness } from "@theme/helper/tools";
import { MotionProps } from "framer-motion";
import type { DefaultTheme } from "styled-components";

interface AnimateReturnValue {
  container: MotionProps;
  backdrop: MotionProps;
}

export const ConfirmUpdateBoxAnimate = (
  theme: DefaultTheme
): AnimateReturnValue => ({
  container: {
    variants: {
      visible: {
        opacity: 1,
      },
      hidden: {
        opacity: 0,
        transition: {
          type: "spring",
          damping: 50,
          stiffness: 400,
          delayChildren: 0.1,
          when: "beforeChildren",
          staggerChildren: 0.25,
        },
      },
    },
    style: {
      boxShadow: [
        `-0.5em -0.5em 0.7em ${colorBrightness(theme.backgroundColor, 2.8)}`,
        `inset -0.5em -0.5em 0.7em ${colorBrightness(
          theme.backgroundColor,
          2.8
        )}`,
        `0.5em 0.5em 0.7em ${colorBrightness(theme.backgroundColor, -10)}`,
        `inset 0.5em 0.5em 0.7em ${colorBrightness(
          theme.backgroundColor,
          -10
        )}`,
      ].join(","),
    },
    transition: { duration: 0.25 },
    initial: "hidden",
    animate: "visible",
    exit: "hidden",
  },
  backdrop: {
    variants: {
      normal: {
        x: "auto",
        height: "auto",
        backgroundColor: "#ffffff00",
      },

      focus: {
        x: 0,
        height: "100%",
        backgroundColor: `${theme.backgroundColor}20`,
      },
    },
    exit: {
      display: "none",
      visibility: "hidden",
      opacity: 0,
      transition: { duration: 0.1 },
    },
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 120,
      bounce: 0,
      duration: 0.2,
    },
  },
});
