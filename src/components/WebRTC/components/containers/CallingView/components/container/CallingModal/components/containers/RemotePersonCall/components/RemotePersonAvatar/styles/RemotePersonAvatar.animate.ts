import { MotionProps } from "framer-motion";
type Animate = RemotePersonAvatarAnimate<MotionProps>;

const RemotePersonAvatar = Object.freeze<Animate>({
  Container: {
    layout: true,
  },
  Wave: {
    variants: {
      initial: { scale: 0.75 },
      animate: (i) => ({
        scale: 1.5,
        transition: {
          type: "tween",
          ease: "linear",
          repeat: Infinity,
          duration: 1,
          delay: i * 0.5,
        },
      }),
    },
    initial: "initial",
    animate: "animate",
    exit: "initial",
  },
});

export default RemotePersonAvatar;
