import { MotionProps } from "framer-motion";

interface Animation {
  container: MotionProps;
  iconBox: MotionProps;
  activeWave: MotionProps;
}

export const IconButtonAnimation: Animation = {
  container: {
    whileHover: { y: -1, scale: 1.05, filter: "brightness(105%)" },
    whileTap: {
      y: 0,
      scale: 0.98,
      transition: { duration: 0 },
    },
    transition: { filter: { duration: 0 } },
    style: { filter: "brightness(90%)" },
  },
  iconBox: {
    variants: {
      reset: { rotate: 0, skew: 0 },
      ring: {
        rotate: [0, -25, 25, -25, 25, 0, 0],
        skew: 1,
        transition: {
          duration: 1.2,
          type: "tween",
          ease: "easeInOut",
          times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 1],
          repeat: Infinity,
          repeatDelay: 0.2,
        },
      },
      call: {},
    },
  },
  activeWave: {
    variants: {
      wave: (i) => ({
        scale: 2,
        transition: {
          type: "tween",
          ease: "linear",
          repeat: Infinity,
          duration: 1,
          delay: i * 0.5,
        },
      }),
    },
    animate: "wave",
    style: { borderWidth: "0.15em" },
  },
};
