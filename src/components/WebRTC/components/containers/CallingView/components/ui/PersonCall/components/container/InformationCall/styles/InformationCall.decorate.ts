import { MotionProps } from "framer-motion";

type PersonCallInfoAnimate = {
  container: MotionProps;
  name: MotionProps;
  calling: MotionProps;
};

export const PersonCallAnimation: PersonCallInfoAnimate = {
  container: {
    variants: {
      audio: {
        top: "50%",
        left: "50%",
        translate: "-50% -50%",
      },
      video: (i) => {
        if (i === 0) {
          return { top: "7%", left: "7%" };
        }
        return { top: "7%", left: "93%" };
      },
    },
    transition: { duration: 0.5, bounce: 0 },
    initial: "audio",
  },
  name: {
    variants: {
      audio: { opacity: 0, transition: { duration: 0 } },
      video: { opacity: 1, transition: { delay: 0.4 } },
    },
    initial: "audio",
    animate: "video",
    exit: "audio",
  },
  calling: {
    variants: {
      normal: { scale: 1, borderWidth: 1 },
      calling: (i) => ({
        scale: 2,
        borderWidth: (i + 1) * 2,
        transition: {
          type: "tween",
          ease: "linear",
          repeat: Infinity,
          duration: 1,
          delay: i * 0.5,
        },
      }),
    },
    initial: "normal",
    animate: "calling",
    exit: "normal",
  },
};
